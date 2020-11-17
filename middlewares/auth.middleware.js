const User = require(".././models/user.model");

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/signin");
    return;
  }
  User.findOne({ _id: req.signedCookies.userId }).then((user) => {
    if (!user) {
      res.redirect("/auth/signin");
      return;
    }
    res.locals.user = user;
    next();
  });
};
