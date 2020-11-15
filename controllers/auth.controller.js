const User = require("../models/user.model");

module.exports.signin = (req, res) => {
  res.render("auth/signin");
};

module.exports.postSignin = (req, res, next) => {};
