const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports.index = (req, res) => {};

module.exports.search = (req, res) => {
  // var q = req.query.q;
  // var matchedUsers = users.filter(function (user) {
  //   return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  // });
  // res.render("users/index", {
  //   users: matchedUsers,
  // });
};

module.exports.signup = (req, res) => {
  res.render("users/signup");
};

module.exports.postCreate = (req, res, next) => {
  const { name, email, password } = req.body;
  // const newUser = new User({ name: name, email: email, password: password });
  // bcrypt.getSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     newUser.password = hash;
  //     newUser.save((err) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       } else {
  //         res.redirect("/users/signin");
  //       }
  //     });
  //   });
  // });
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
          errors: ["This email already exists"],
          values: req.body,
        });
      }
    })
    .catch(next);
};
