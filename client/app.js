$(document).ready(function() {
    var $urlInput = $('#url-input');
    var $result = $('#result');

    $('#url-form').submit(function(e) {
        e.preventDefault();
        $result.html('<img src="img/spinner.gif" />');
        $result.removeClass('alert-success alert-danger');

        $.ajax({
          url: '/api/urls',
          method: 'POST',
          data: {
            url: $urlInput.val()
          }
        })
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
