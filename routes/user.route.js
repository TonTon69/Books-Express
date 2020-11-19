const express = require("express");
const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: "./public/uploads/" });
const router = express.Router();
const userController = require("../controllers/user.controller");
const userValidate = require("../middlewares/validates/user.validate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/signup", userController.signup);
router.post(
  "/signup",
  upload.single("avatar"),
  userValidate,
  userController.postCreate
);

module.exports = router;
