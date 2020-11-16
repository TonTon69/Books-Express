const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {};

module.exports.search = (req, res) => {};

module.exports.signup = (req, res) => {
  res.render("users/signup");
};

module.exports.postCreate = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.render("users/signup", {
          errors: ["This email already exists!"],
          values: req.body,
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then(() => {
                res.render("auth/signin");
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch(next);
};
