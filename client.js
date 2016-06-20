$(document).ready(function() {
    var $urlInput = $('#url-input');
    var $result = $('#result');
    
    $('#url-form').submit(function(e) {
        e.preventDefault();
        $result.html('<img src="img/spinner.gif" />');
        $result.removeClass('alert-success alert-danger');
        
        var url = $urlInput.val();
        $.getJSON('api/shorten/' + url)
        .done(function(response) {
            $result.html('Shortened URL: ' + response.shortened_url);
            $result.addClass('alert-success');
        })
        .fail(function(response) {
            $result.html('Error: ' + response.responseJSON.error);
            $result.addClass('alert-danger');
        });
    })
});