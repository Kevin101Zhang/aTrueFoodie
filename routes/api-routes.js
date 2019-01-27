var db = require("../models");
var express = require('express');
var axios = require('axios');
var yelp = require('yelp-fusion');
var yelpClient = yelp.client('goV2fJN1bsvrbS3Kks8RTfWmyn7rGA1UnembUsKhboPqWkV6HaO0ffrUxOEnEKHOwXxhnO6tobM1Y73_OhE2cpGdshq2K9IxWEQm90H4VX8UzGMeqSjT5ABMLmtKXHYx');

var Zomato = require('zomato.js');
const zomato = new Zomato('ede2e38f2b30c238f7eec802e4642392');

// module.exports = function(app) {

// };

var router = express.Router();

router.post('/api/search/', function(req, res) {
    console.log(req.body);
    var searchTerm = req.body.searchTerm;
    var location = req.body.location.toString();

    // Yelp:
    yelpClient.search({ 
        term: searchTerm,
        location: location
      }).then(function(response) {
        var allYelpData = response.jsonBody.businesses;
        allYelpData = allYelpData.sort(function(a, b){
            return b.rating - a.rating;
        });
        var yelpData = allYelpData[0];

        //Zomato:
        zomato.search({
            q: searchTerm,
            count: 1,
            lat: req.body.location[0],
            lon: req.body.location[1]
        })
        .then(function(data){
            var zomatoData = {}
            zomatoData.name = data.restaurants[0].name;
            zomatoData.rating = data.restaurants[0].user_rating.aggregate_rating;
            zomatoData.address = data.restaurants[0].location.address;
            zomatoData.apiName = 'zomato';

            var allData = {
                yelpData: yelpData,
                zomatoData: zomatoData
            };

            console.log(allData);
            res.json(allData);
        });
      }).catch(function(e) {
        console.log(e);
    });
});

module.exports = router;