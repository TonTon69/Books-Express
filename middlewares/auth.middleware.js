const User = require("../models/user.model");

module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.userId) {
    res.redirect("/auth/signin");
    return;
  }
  User.find({ id: req.cookies.userId })
    .exec()
    .then((user) => {
      if (!user) {
        res.redirect("/auth/signin");
        return;
      }
    });
  next();
};
