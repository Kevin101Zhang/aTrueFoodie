$( document ).ready(function() {
    console.log( "ready!" );

    var CLIENT_ID = 'Q5N1AJUZOCOZ2GL23LCRHWN4WGNM3OR1IJFRGLHLY1TUZY2R'
    var CLIENT_SECRET = 'R1L4ZQS0XR3MXHV4IQSDOD2QW2TYDTTPFIZZU233INRHJS4E'
    
    function getLocation() {
        var geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(showLocation, geoErrorHandler);
    }
    
     function showLocation(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var location = [latitude, longitude];
        var query = $('#foursquareSearch').val();

        var url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180323&limit=10&ll=' + location + '&query='+ query + "'"
    
      $.ajax({
          type: "GET",
          url: url,
        }).then(function(res) { {
              result = res.response.groups[0];
              venue = result.items[0].venue;
              console.log(venue.id)
              $("#foursquare").find($(".restaurantName")).text(JSON.stringify(venue.name));
              $("#foursquare").find($(".restaurantLocation")).text(JSON.stringify(venue.location.address.toString()));
            
        //---------- Second Search for Rating___    
              function venueRating() {
        
                var VENUE_ID = venue.id
                var venueurl = 'https://api.foursquare.com/v2/venues/' + VENUE_ID + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180323'
              
                $.ajax({
                    type: "GET",
                    url: venueurl,
                  }).then(function(res) { {
                      $("#foursquare").find($(".restaurantRating")).text(JSON.stringify(res.response.venue.rating));
                    }
                });
              }
              venueRating();
          }
      });
    }
           
    $(document).on('click', '#foursquareSubmit', function(e) {
        getLocation();
     });    
});