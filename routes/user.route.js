const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userValidate = require("../middlewares/validates/user.validate");

router.get("/signup", userController.signup);
router.post("/signup", userValidate, userController.postCreate);

module.exports = router;
