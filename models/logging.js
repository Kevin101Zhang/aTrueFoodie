var bycrpt = require("bcrypt");
//For Login
module.exports = function (sequelize, DataTypes) {
    var signUpInfo = sequelize.define("signUpInfo", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    signUpInfo.prototype.validatePassword = function (password) {
        return bycrpt.compareSync(password, this.password);
    };
    return signUpInfo;
};

//For Fav Rest
module.exports = function (sequelize, DataTypes) {
    var favorite_restaurants = sequelize.define("favorite_restaurants", {
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        yelp_id: DataTypes.STRING,
    });

    return favorite_restaurants;
};