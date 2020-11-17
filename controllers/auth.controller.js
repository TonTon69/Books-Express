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
          errors: ["Your email entered is incorrect!"],
          values: req.body,
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.render("auth/signin", {
              errors: ["Auth failed!"],
              values: req.body,
            });
          }
          if (!result) {
            return res.render("auth/signin", {
              errors: ["Your password entered is incorrect!"],
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
