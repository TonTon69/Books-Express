const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.signin = (req, res) => {
  res.render("auth/signin");
};

module.exports.postSignin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.render("auth/signin", {
          errors: ["Your email do not match!"],
          values: req.body,
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.render("auth/signin", {
              errors: ["Sign in failed!"],
              values: req.body,
            });
          }
          if (!result) {
            return res.render("auth/signin", {
              errors: ["Your password do not match!"],
              values: req.body,
            });
          }
          res.cookie("userId", user[0].id, {
            signed: true,
          });
          res.redirect("/");
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie("userId");
  res.clearCookie("sessionId");
  res.redirect("/");
};
