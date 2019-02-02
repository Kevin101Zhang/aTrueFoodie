var bycrpt = require("bcrypt");
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