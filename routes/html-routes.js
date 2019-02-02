// requiements
var path = require("path");
let db = require("../models");

module.exports = function (app) { 

    // PRODUCTION HTML FILES USE THESE FILES FOR PRODUCTION
    
    // HOME PAGE
    app.get("/home", function (req,res) {
        // TODO: SAVE THE REQUEST TO DATABASE TO SEE WHAT DEVICE THE USER IS USING
        //       LOCATION, IP ADDRESS, ETC.
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // CONTACT PAGE
    app.get("/contact", function (req,res) {
        res.sendFile(path.join(__dirname, "../public/contact.html"));
    });

    // index PAGE -- original
    app.get("/index", function (req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Our Story PAGE -- original
    app.get("/ourstory", function (req,res) {
        res.sendFile(path.join(__dirname, "../public/ourstory.html"));
    });

    // Our Story PAGE -- original
    app.get("/signup", function (req,res) {
        res.sendFile(path.join(__dirname, "../uat_html/public/signup.html"));
    });

    // PROTO-TYPE - User Acceptence Testing
    // USE THESE ROUTES BELOW FOR TESTING
        // UAT HOME PAGE
        app.get("/uat/home", function (req,res) {
            res.sendFile(path.join(__dirname, "../uat_html/public/home.html"));
        });
    
        // UAT CONTACT PAGE
        app.get("/uat/contact", function (req,res) {
            res.sendFile(path.join(__dirname, "../uat_html/public/contact.html"));
        });
    
        // UAT index PAGE -- original
        app.get("/uat/index", function (req,res) {
            res.sendFile(path.join(__dirname, "../uat_html/public/index.html"));
        });
    
        // UAT Our Story PAGE -- original
        app.get("/uat/ourstory", function (req,res) {
            res.sendFile(path.join(__dirname, "../uat_html/public/ourstory.html"));
        });
    
        // UAT Our Story PAGE -- original
        app.get("/uat/signup", function (req,res) {
            res.sendFile(path.join(__dirname, "../uat_html/public/signup.html"));
        });
};
