const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.signup = (req, res) => {
  res.render("users/signup");
};

module.exports.postCreate = (req, res, next) => {
  req.body.avatar = req.file.path;
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      return res.redirect("/user/signup");
    }
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          res.render("users/signup", {
            errors: ["This email already exists!"],
            values: req.body,
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: result.url,
                password: hash,
              });
              user
                .save()
                .then(() => {
                  res.render("auth/signin", {
                    alerts: ["Sign Up Success!"],
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      })
      .catch(next);
  });
};
