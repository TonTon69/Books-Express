const User = require(".././models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/signin");
    return;
  }
  const user = await User.findById(req.signedCookies.userId);
  if (!user) {
    res.redirect("/auth/signin");
    return;
  }
  res.locals.user = user;
  next();
};
