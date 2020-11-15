module.exports = function (req, res, next) {
  var errors = [];
  if (!req.body.name) {
    errors.push("Please provide your name.");
  }
  if (!req.body.email) {
    errors.push("Please provide your email.");
  }
  if (!req.body.password) {
    errors.push("Please provide your password.");
  }
  if (errors.length) {
    res.render("users/signup", {
      errors: errors,
      values: req.body,
    });
    return;
  }
  next();
};
