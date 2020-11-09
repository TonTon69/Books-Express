const users = [
  { id: 1, name: "Hoang" },
  { id: 2, name: "Minh" },
  { id: 3, name: "Huynh" },
];

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
module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  users.push(req.body);
  res.redirect("/users");
};
