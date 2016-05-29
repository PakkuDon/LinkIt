var express = require('express');
var shortHash = require('short-hash');
var monk = require('monk');

var app = express();
app.set('port', 3000);

var db = monk('localhost:27017/url-shortener');
var urls = db.get('urls');

app.get('/api/shorten/*', function(req, res) {
    var url = req.originalUrl.replace('/api/shorten/', '');
    var baseUrl = req.protocol + '://' 
        + req.get('host') + '/';
    var shortenedUrl = baseUrl + shortHash(url);

    urls.insert({
        'original_url': url,
        'shortened_url': shortenedUrl
    });
    res.status(200).json({
        'original_url': url,
        'shortened_url': shortenedUrl
    });
});

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});