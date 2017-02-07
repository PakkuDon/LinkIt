if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var bodyParser = require('body-parser');
var shortHash = require('short-hash');
var pg = require('pg-promise')();

var app = express();
app.set('port', 3000);

var db = pg(process.env.DATABASE_URL || {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// Index page
app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname + '/index.html');
});

// Return JSON result containing original URL and shortened result
app.post('/api/urls/', function(req, res) {
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

// Resolve short URL and redirect to original URL
app.get('/:hash', function(req, res) {
  db.query(`
    SELECT *
    FROM links
    WHERE hash = $1
    `, [req.params.hash])
    .then(results => {
      if (results.length === 0) {
        res.status(404)
          .json({ error: 'URL not found' });
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

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
