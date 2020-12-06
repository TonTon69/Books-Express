const User = require("../../models/user.model");
module.exports = async (req, res, next) => {
  var errors = [];
  const checkEmail = await User.find({ email: req.body.email });
  if (!req.body.name) {
    errors.push("Please provide your name.");
  }
  if (!req.body.email) {
    errors.push("Please provide your email.");
  }
  if (checkEmail.length >= 1) {
    errors.push("This email already exists.");
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
