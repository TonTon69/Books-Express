module.exports.isAdmin = (req, res, next) => {
  const { role } = res.locals.user;
  if (role >= 1) {
    next();
  } else {
    res.redirect("/");
  }
};
