$(document).ready(function() {
    var $urlInput = $('#url-input');
    var $result = $('#result');
    
    $('#url-form').submit(function(e) {
        e.preventDefault();
        
        var url = $urlInput.val();
        $.getJSON('api/shorten/' + url)
        .done(function(response) {
            $result.html('Shortened URL: ' + response.shortened_url);
        })
        .fail(function(response) {
            $result.html('Error: ' + response.responseJSON.error);
        });
    })
});