module.exports = function (sequelize, DataTypes) {
    var signUpInfo = sequelize.define("signUpInfo", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return signUpInfo;
};



