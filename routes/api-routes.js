var db = require("../models");
var express = require('express');

var yelp = require('yelp-fusion');
var yelpClient = yelp.client('goV2fJN1bsvrbS3Kks8RTfWmyn7rGA1UnembUsKhboPqWkV6HaO0ffrUxOEnEKHOwXxhnO6tobM1Y73_OhE2cpGdshq2K9IxWEQm90H4VX8UzGMeqSjT5ABMLmtKXHYx');

var googleplacesapi = require('googleplacesapi');

var Zomato = require('zomato.js');
const zomato = new Zomato('ede2e38f2b30c238f7eec802e4642392');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var router = express.Router();

router.post('/api/search/', function (req, res) {
    console.log(req.body);
    var searchTerm = req.body.searchTerm;
    var location = req.body.location.toString();
    var allData = {};

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
        // allData.yelpData = yelpData;
        // var yelpData = allYelpData;
        console.log(yelpData);

        allData.yelpData = {
            id: yelpData.id,
            name: yelpData.name,
            image_url: yelpData.image_url,
            location: yelpData.location.address1 + ", " + yelpData.location.city + ", " + yelpData.location.zip_code,
            phone: yelpData.display_phone,
            rating: yelpData.rating,
            yelp_review_count: yelpData.review_count
        };

        // console.log('Yelp');
        // console.log(yelpData.name);

        //Google:
        var gpa = new googleplacesapi({
            key: 'AIzaSyDFTJ2SY-u5McOmAaic0i0l-kp_0oY95Po'
        });

        // gpa.search({query: 'burger', location: '40.7207484, -73.7763413'}, function(err, res) {
        gpa.search({
            query: yelpData.name,
            location: location.toString()
        }, function (err, data) {
            if (!err) {
                // console.log('google');
                // console.log(data); // Results

                if (data.results.length > 0) {
                    var googleData = data.results[0];

                    allData.googleData = {
                        id: googleData.id,
                        name: googleData.name,
                        rating: googleData.rating,
                        open: googleData.opening_hours.open_now,
                        price_range: googleData.price_level,
                        google_review_count: googleData.user_ratings_total
                    }

                    allData.trueReview = {
                        trueRating: ((allData.yelpData.rating + googleData.rating) / 2),
                        total_review_count: (allData.yelpData.yelp_review_count + googleData.user_ratings_total)
                    }
                } else {
                    allData.trueReview = {
                        trueRating: allData.yelpData.rating,
                        total_review_count: allData.yelpData.yelp_review_count
                    }
                }

                // Foursquare: 
                // var axios = require('axios');
                // var CLIENT_ID = 'Q5N1AJUZOCOZ2GL23LCRHWN4WGNM3OR1IJFRGLHLY1TUZY2R';
                // var CLIENT_SECRET = 'R1L4ZQS0XR3MXHV4IQSDOD2QW2TYDTTPFIZZU233INRHJS4E';
                // var url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180323&limit=10&ll=' + location + '&query='+ yelpData.name + "'"
                // axios.get(url).then(function(data) {
                //     // console.log(data.data.response.groups[0].items[0]);
                //     var allFoursquareData = data.data.response.groups[0].items[0];
                //     if(allFoursquareData) {
                //         var foursquareData = {
                //             id: allFoursquareData.venue.id,
                //             name: allFoursquareData.venue.name
                //         }

                //         // Foursquare Rating Search:
                //         var foursquareRatingSearchUrl = 'https://api.foursquare.com/v2/venues/' + foursquareData.id + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180323';
                //         axios.get(foursquareRatingSearchUrl).then(function(data){
                //             if(data.data.response.venue.rating) {
                //                 foursquareData.rating = data.data.response.venue.rating;
                //                 console.log(foursquareData);
                //                 allData.foursquareData = foursquareData;
                //                 // console.log("allData");
                //                 // res.json(allData);
                //             } 
                //         })
                //     }
                //     console.log(allData);
                //     res.json(allData);
                // })

                console.log('google data');
                console.log(googleData);

                console.log(allData);
                res.json(allData);
            } else {
                console.log(err);
            }
        });
    }).catch(function (e) {
        console.log(e);
    });
});

router.post("/api/signUp/", function (req, res) {

    var myPlaintextPassword = req.body.password;
    var unique;

    db.signUpInfo.count({
            where: {
                username: req.body.username
            }
        })
        .then(function (count) {
            if (count !== 0) {
                unique = false;
            } else {
                unique = true;
            };

            // console.log(unique);
            if (unique === true) {
                bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
                    console.log(hash);
                    db.signUpInfo.create({
                        username: req.body.username,
                        password: hash,
                    }).then(function (result) {
                        res.json(result);
                        console.log(result);
                        // res.location('back');
                    });
                });
            } else {
                res.json({
                    message: 'Username Is Already Taken',
                    success: false
                });
                console.log("Username Is Taken");
            }

        });
});

router.post("/api/login/", function (req, res) {
    console.log("Connected to API\n\n");

    var myPlaintextPassword = req.body.password;
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
                message: 'Username or Password is Incorrect',
                success: false
            });
        } else {
            res.json({
                message: 'Login Success',
                success: true
            });
        }
    });
});


module.exports = router;