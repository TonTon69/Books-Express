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

module.exports.postCreate = async (req, res) => {
  const users = await User;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.file) {
    req.body.avatar = req.file.path.split("/").slice(-2).join("/");
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        return res.redirect("/user/signup");
      } else {
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          avatar: result.url,
        };
        users.create(user);
        res.render("auth/signin", {
          alerts: ["Sign Up Success!"],
        });
      }
    });
  }
};
