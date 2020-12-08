module.exports.isAdmin = (req, res, next) => {
  if (!res.locals.user.role) {
    res.redirect("/");
    return;
  }
  next();
};
