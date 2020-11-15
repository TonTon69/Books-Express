const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports.index = (req, res) => {};

module.exports.search = (req, res) => {};

module.exports.signup = (req, res) => {
  res.render("users/signup");
};

module.exports.postCreate = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        User.create({
          name: name,
          email: email,
          password: password,
        }).then(() => {
          res.redirect("/users/signin");
        });
      } else {
        res.render("users/signup", {
          errors: ["This email already exists!"],
          values: req.body,
        });
      }
    })
    .catch(next);
};
