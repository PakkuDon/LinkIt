var express = require('express');
var shortHash = require('short-hash');

var app = express();
app.set('port', 3000);

app.get('/api/shorten/*', function(req, res) {
    var url = req.originalUrl.replace('/api/shorten/', '');
    var shortenedUrl = shortHash(url);
    
    res.status(200).json({
        'original_url': url,
        'shortened_url': shortenedUrl
    });
});

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});