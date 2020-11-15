const User = require("../models/user.model");

module.exports.signin = (req, res) => {
  res.render("auth/signin");
};

module.exports.postSignin = (req, res, next) => {
  const { email, password } = req.body;
  var errors = [];
  if (!email) {
    errors.push("Please provide your email.");
  }
  if (!password) {
    errors.push("Please provide your password.");
  }
  if (errors.length) {
    res.render("auth/signin", {
      errors: errors,
      values: req.body,
    });
    return;
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.render("auth/signin", {
          errors: ["Email does not exist!"],
          values: req.body,
        });
      }
      if (user.password !== password) {
        res.render("auth/signin", {
          errors: ["Your password entered is incorrect!"],
          values: req.body,
        });
        return;
      }
      res.redirect("/");
    })
    .catch(next);
};
