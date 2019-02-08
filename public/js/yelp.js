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
        var restaurantFound = ("<h3>" + "We found the best restaurant in your area!" + "</h3><br>");

        var imageUrl = res.yelpData.image_url;
        var restaurantImage = $("<img>");
            restaurantImage.attr('class', "img");
            restaurantImage.attr('src', imageUrl);
            restaurantImage.attr('alt', "Doctor Image");
            restaurantImage.attr('style', "display: block; margin-left: 0px; margin-right: auto; width: 20%");

        var restaurantInfo = ("<p>" + res.yelpData.name + "<br>" + res.yelpData.location + "<br>" + res.yelpData.phone + "</p><br>")

        var trueDataRating = ("<p>" + "Aggregate Rating: " + res.trueReview.trueRating + "<br>" + "Total Review Count: " + res.trueReview.total_review_count + "</p><br>");

        // yelp rating here
        var yelpData = ("<p>" + "Yelp Rating: " + res.yelpData.rating + "</p><br>");
        // google rating here
        var googleData = ("<p>" + "Google Rating: " + res.googleData.rating + "</p><br>");

        $("#true-result").append(restaurantFound);
        $("#true-result").append(restaurantImage);
        $("#true-result").append(restaurantInfo);
        $("#true-result").append(trueDataRating);
        $("#true-result").append(yelpData);
        $("#true-result").append(googleData);
        


        

 

    


    })
 }

 function geoErrorHandler(error) {
     console.log(error);
 }

 $(document).on('click', '#searchSubmit', function(e) {
    getLocation();
 });
