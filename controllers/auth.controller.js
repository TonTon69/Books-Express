const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.signin = (req, res) => {
  res.render("auth/signin");
};

module.exports.postSignin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.render("auth/signin", {
      errors: ["Your email do not match!"],
      values: req.body,
    });
    return;
  }
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword) {
    res.render("auth/signin", {
      errors: ["Your password do not match!"],
      values: req.body,
    });
    retrun;
  }
  res.cookie("userId", user.id, {
    signed: true,
  });
  res.redirect("/");
};
module.exports.settings = async (req, res) => {
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("auth/settings", {
    user,
  });
};
module.exports.account = async (req, res) => {
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("auth/account", {
    user,
  });
};
module.exports.logout = (req, res) => {
  res.clearCookie("userId");
  res.clearCookie("sessionId");
  res.redirect("/");
};
