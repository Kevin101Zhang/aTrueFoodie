console.log('js online');

function getLocation() {
    var geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(showLocation, geoErrorHandler);
}

 function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = [latitude, longitude];

    var searchTerm = $('#search-keyword').val();

    $.ajax('/api/search/', {
        type: 'POST',
        data: {
            searchTerm: searchTerm,
            location: location
        },
        dataType: 'json'
    }).then(function (res) {

        // a true foodie result here
        var restaurantFound = ("<h3>" + "The best restaurant for your search " + "\"" + searchTerm + "\"" + " in you area" + "</h3><br>");

        var imageUrl = res.yelpData.image_url;
        var restaurantImage = $("<img>");
            restaurantImage.attr('class', "img");
            restaurantImage.attr('src', imageUrl);
            restaurantImage.attr('alt', "Doctor Image");
            restaurantImage.attr('style', "display: block; margin-left: 0px; margin-right: auto; width: 20%");

        var restaurantInfo = ("<p id='restaurant-info'>" + res.yelpData.name + "<br>" + res.yelpData.location + "<br>" + res.yelpData.phone + "</p><br>")

        // yelp and google ratings here
        var yelpGoogleData = ("<span id='yelp-google-rating'>" + "Yelp Rating: " + res.yelpData.rating + "</span><br>" + "<span>" + "Google Rating: " + res.googleData.rating + "</span><br>");

        // our true rating here
        var trueDataRating = ("<span id='true-rating'>" + "Average Rating: " + res.trueReview.trueRating + "<br>" + "Total Review Count: " + res.trueReview.total_review_count + "</span><br>");

        $("#true-result").prepend(trueDataRating);
        $("#true-result").prepend(yelpGoogleData);
        $("#true-result").prepend(restaurantInfo);
        $("#true-result").prepend(restaurantImage);
        $("#true-result").prepend(restaurantFound);

    })
 }

 function geoErrorHandler(error) {
     console.log(error);
 }

 $(document).on('click', '#searchSubmit', function(e) {
    getLocation();
 });
