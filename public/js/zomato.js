$(document).ready(function () {

    $("#zomatoSubmit").on("click", function (event) {
        event.preventDefault();

        var zomatoAPIKey = "ede2e38f2b30c238f7eec802e4642392";
        var zomatoSearch = $("#zomatoSearch").val();
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + zomatoSearch + "&count=1&lat=40.7&lon=-74.0&apikey=" + zomatoAPIKey;

        console.log("What I Searched for" + zomatoSearch)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.restaurants[0].restaurant)
            $("#zomato").find($(".restaurantName")).text(JSON.stringify(response.restaurants[0].restaurant.name));
            $("#zomato").find($(".restaurantLocation")).text(JSON.stringify(response.restaurants[0].restaurant.location.address));
            $("#zomato").find($(".restaurantRating")).text(JSON.stringify(response.restaurants[0].restaurant.user_rating.aggregate_rating));
        });
    });

});