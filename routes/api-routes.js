var db = require("../models");
var express = require('express');
var yelp = require('yelp-fusion');
var yelpClient = yelp.client('goV2fJN1bsvrbS3Kks8RTfWmyn7rGA1UnembUsKhboPqWkV6HaO0ffrUxOEnEKHOwXxhnO6tobM1Y73_OhE2cpGdshq2K9IxWEQm90H4VX8UzGMeqSjT5ABMLmtKXHYx');

var Zomato = require('zomato.js');
const zomato = new Zomato('ede2e38f2b30c238f7eec802e4642392');

var GooglePlacesPromises = require('googleplaces-promises');
var placesPromises = new GooglePlacesPromises('AIzaSyDFTJ2SY-u5McOmAaic0i0l-kp_0oY95Po');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// module.exports = function(app) {

// };

var router = express.Router();

router.post('/api/search/', function (req, res) {
    console.log(req.body);
    var searchTerm = req.body.searchTerm;
    var location = req.body.location.toString();

    // Yelp:
    yelpClient.search({
        term: searchTerm,
        location: location
    }).then(function (response) {
        var allYelpData = response.jsonBody.businesses;
        allYelpData = allYelpData.sort(function (a, b) {
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
            .then(function (data) {
                var zomatoData = {}
                zomatoData.name = data.restaurants[0].name;
                zomatoData.rating = data.restaurants[0].user_rating.aggregate_rating;
                zomatoData.address = data.restaurants[0].location.address;
                zomatoData.apiName = 'zomato';

                // console.log(allData);

                // Google Places:
                var searchParams = {
                        location: req.body.location,
                        types: 'restaurant',
                        keyword: req.body.searchTerm
                    },

                    placeSearch = placesPromises.placeSearch(searchParams);

                placeSearch
                    .then(function (googleData) {
                        // console.log('google');
                        // console.log(googleData);

                        var allData = {
                            yelpData: yelpData,
                            zomatoData: zomatoData,
                            googleData: googleData.results
                        };

                        res.json(allData);
                    })
                    .fail(function (error) {
                        console.log(error);
                    })
            });
    }).catch(function (e) {
        console.log(e);
    });
});

router.post("/api/signUp/", function (req, res) {
    console.log(req.body);
    var myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        console.log(hash);

        db.signUpInfo.create({
            username: req.body.username,
            password: hash,
        }).then(function (result) {
            res.json(result);
            console.log(result);
        });
    });
});


router.post("/api/login/", function (req, res) {
    console.log("Connected to API\n\n");

    var myPlaintextPassword = req.body.password; //456
    console.log(myPlaintextPassword);

    // resPass == true
    db.signUpInfo.findOne({
        where: {
            username: req.body.username,
        }
    }).then(function (user) {
        console.log(user);

        if (!user.validatePassword(myPlaintextPassword)) {
            res.json({
                success: false,
                message: 'Username or Password is Incorrect'
            });
            console.log("Does not Work");
        } else {
            res.sendStatus(200);
            console.log("it works");
        }
    });
});

module.exports = router;