console.log('js online');

function getLocation() {
    var geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(showLocation, geoErrorHandler);
}

 function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = [latitude, longitude];

    var searchTerm = $('#yelpSearch').val();

    $.ajax('/api/search/', {
        type: 'POST',
        data: {
            searchTerm: searchTerm,
            location: location
        },
        dataType: 'json'
    }).then(function (res) {
        $("#yelp").find($(".restaurantName")).text(JSON.stringify(res.yelpData.name));
        $("#yelp").find($(".restaurantLocation")).text(JSON.stringify(res.yelpData.location.display_address.toString()));
        $("#yelp").find($(".restaurantRating")).text(JSON.stringify(res.yelpData.rating));
        
        $("#zomato").find($(".restaurantName")).text(JSON.stringify(res.zomatoData.name));
        $("#zomato").find($(".restaurantLocation")).text(JSON.stringify(res.zomatoData.address));
        $("#zomato").find($(".restaurantRating")).text(JSON.stringify(res.zomatoData.rating));
        console.log(res);
    })
 }

 function geoErrorHandler(error) {
     console.log(error);
 }

 $(document).on('click', '#yelpSubmit', function(e) {
    getLocation();
 });
