// Documentation for end-points http://instagram.com/developer/endpoints/users/
// Documentation for generate Access Token https://www.youtube.com/watch?v=LkuJtIcXR68

//Document Load
$(function () {

  //Api Endpoint
  
  // HASHTAG
  //var apiUrl = 'https://api.instagram.com/v1/tags/sunnydays/media/recent?client_id=b9ff06af8347420893c7a55d46aa8c81&count=4';
  
  // USER - use http://jelled.com/instagram/lookup-user-id to look up id
  var apiUrl = 'https://api.instagram.com/v1/users/5503662/media/recent/?client_id=b9ff06af8347420893c7a55d46aa8c81&count=4' 
  
  
  var nApiUrl = null;


  //Bind button
  $('button').on('click', function () { getImg() })

  //Get starting images
  getImg();

  //GetImages
  function getImg() {

  //Get ref to Button
  var button = $('button'), text = button.text()

  //Only send request if we are not already doing it
  if (button.text() != 'Loading...') {

    //Set button-text
    button.text('Loading...')

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: nApiUrl == null ? apiUrl : nApiUrl,
        success: function (res) {

            //Check img count if we have reached the end
            var limit = typeof res.data != 'undefined' ? res.data.length : 0;

            //Add to container if we have pictures else add empty
            if (limit > 0) {
                for (var i = 0; i < limit; i++) {

                    //Add image to container
                    $('.instagram').append($('<div>').addClass('instagram-placeholder').attr('id', res.data[i].id)
                        .append($('<img>').addClass('grid instagram-image').attr('src', res.data[i].images.standard_resolution.url)
                    ));

                }

                //Set nApiUrl
                nApiUrl = res.pagination.next_url;

                //Set button-text again
                button.text(text)
            } else {

                //Add Empty div
                $('.instagram').append($('<div>'));

                //Reset nApiUrl
                nApiUrl = null;

                //Set button-text again
                button.text(text)
            }
        }

    });

    }

  }

});