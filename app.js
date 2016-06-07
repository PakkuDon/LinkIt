var express = require('express');
var shortHash = require('short-hash');
var monk = require('monk');

var app = express();
app.set('port', 3000);

var db = monk('localhost:27017/url-shortener');
var urls = db.get('urls');

// Return index page
app.get('/', function(req, res) {
    res.status(200).sendFile(__dirname + '/index.html');
});

// Return JSON result containing original URL and shortened result
app.get('/api/shorten/*', function(req, res) {
    var url = req.originalUrl.replace('/api/shorten/', '');
    var baseUrl = req.protocol + '://' 
        + req.get('host') + '/';
    var hash = shortHash(url);

    urls.insert({
        'original_url': url,
        'hash': hash
    }, function(err, result) {
        if (err) {
            res.status(500).json({
                error: 'Failed to shorten URL. Please try again.'
            });
        }
        else {
            res.status(200).json({
                original_url: url,
                shortened_url: baseUrl + hash
            });
        }
    });
});

// Resolve short URL and redirect to original URL
app.get('/:hash', function(req, res) {
    urls.find({ hash: req.params.hash }, function(err, docs) {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error.' });
        }
        else {
            if (docs.length === 0) {
                res.status(404).json({ error: 'URL not found.' });
            }
            else {
                var url = docs[0].original_url;
                res.redirect(url);
            }
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});