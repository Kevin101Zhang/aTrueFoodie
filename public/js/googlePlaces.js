// require('dotenv').config()

$( document ).ready(function() {
    
    $("#googlePlacesSubmit").on("click", function() {
        
        getLocation();

                function getLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    } else { 
                        alert("Geolocation is not supported by this browser!");
                    }
                }

                function showPosition(position) {

                    var userLat = position.coords.latitude;
                    var userLong = position.coords.longitude;
                    var userLatLong = userLat + "," + userLong;
                    console.log("latlong: " + userLatLong);
                    var userZipcode = 10010;
                    var keyword = $("#googlePlacesSearch").val();
                    var urlKeyword = keyword.replace(/ /g,"+");
                    console.log("keyword: " + urlKeyword);

                    var queryURL2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
                    "?location=" + userLatLong +
                    "&radius=1500" +
                    "&type=restaurant" +
                    "&keyword=" + urlKeyword +
                    "&fields=photos,formatted_address,name,opening_hours,rating" +
                    "&key=AIzaSyDFTJ2SY-u5McOmAaic0i0l-kp_0oY95Po";

                    console.log("URL: " + queryURL2);

                    $.ajax({
                        url: queryURL2,
                        method: "GET",
                        dataType: 'json'
                        }).then(function(response) {
                            console.log(response.data);
                            $("#googlePlaces").find($(".restaurantName")).text(JSON.stringify(response.results[0].name));
                            $("#googlePlaces").find($(".restaurantLocation")).text(JSON.stringify(response.results[0].vicinity));
                            $("#googlePlaces").find($(".restaurantRating")).text(JSON.stringify(response.results[0].rating));
                        });


                    };
    

    });
});


