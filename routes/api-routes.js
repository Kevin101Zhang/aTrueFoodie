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
        // var yelpData = allYelpData;

        console.log('Yelp');
        console.log(yelpData.name);

        //Google:
        var gpa = new googleplacesapi({key: 'AIzaSyDFTJ2SY-u5McOmAaic0i0l-kp_0oY95Po'});

        // gpa.search({query: 'burger', location: '40.7207484, -73.7763413'}, function(err, res) {
        gpa.search({query: yelpData.name, location: location.toString()}, function(err, res) {
            if (!err) {
                console.log('google');
                console.log(res); // Results
            } else {
                console.log(err);
            }
        });

        //Zomato:
        // zomato.search({
        //     q: searchTerm,
        //     // count: 1,
        //     lat: req.body.location[0],
        //     lon: req.body.location[1]
        // })
        // .then(function(data){
        //     var zomatoData = data;

        //     // zomatoData.name = data.restaurants[0].name;
        //     // zomatoData.rating = data.restaurants[0].user_rating.aggregate_rating;
        //     // zomatoData.address = data.restaurants[0].location.address;
        //     // zomatoData.apiName = 'zomato';

        //     // console.log(allData);
        // });
      }).catch(function(e) {
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