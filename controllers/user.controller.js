const users = [
  { id: 1, name: "Hoang" },
  { id: 2, name: "Minh" },
  { id: 3, name: "Huynh" },
];
const User = require("../models/user.model");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: users,
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: matchedUsers,
  });
};

module.exports.signup = (req, res) => {
  res.render("users/signup");
};

module.exports.postCreate = (req, res) => {
  users.push(req.body);
  res.redirect("/users");
};
