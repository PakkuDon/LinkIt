if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var bodyParser = require('body-parser');
var shortHash = require('short-hash');
var db = require('./server/db');

var app = express();
app.set('port', 3000);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// GET /
// Index page
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});

// POST /api/urls
// Return JSON result containing original URL and shortened result
app.post('/api/urls/', (req, res) => {
  var url = req.body.url;
  var baseUrl = `${req.protocol}://${req.get('host')}/`
  var hash = shortHash(url);

  db.query(`
    SELECT *
    FROM links
    WHERE hash = $1
    `, [hash])
    .then(results => {
      if (results.length > 0) {
        res.status(200)
          .json({
            original: url,
            shortened: baseUrl + hash
          });
      }
      else {
        db.query(`
          INSERT INTO links (url, hash)
          VALUES ($1, $2)
          `, [url, hash])
          .then(result => {
            res.status(200)
              .json({
                original: url,
                shortened: baseUrl + hash
              })
          })
          .catch(error => {
            console.error(error);
            res.status(500)
              .json({ error: 'Failed to shorten URL. Please try again' });
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500)
        .json({ error: 'Failed to shorten URL. Please try again' });
    });
});

// GET /54dga2
// Resolve short URL and redirect to original URL
app.get('/:hash', (req, res) => {
  db.query(`
    SELECT *
    FROM links
    WHERE hash = $1
    `, [req.params.hash])
    .then(results => {
      if (results.length === 0) {
        res.status(404)
          .sendFile(__dirname + '/404.html');
      }
      else {
        console.log(results);
        res.redirect(results[0].url);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500)
        .json({ error: 'Internal Server Error.' });
    });
});

// 404 response
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/404.html');
});

app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
});
