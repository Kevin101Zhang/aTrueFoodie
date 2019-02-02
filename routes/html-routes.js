// requiements
var path = require("path");
let db = require("../models");

// models

module.exports = function (app) { 

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
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
};
