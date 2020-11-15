const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const userValidate = require("../middlewares/validates/user.validate");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/signup", controller.signup);
router.post("/signup", userValidate, controller.postCreate);

module.exports = router;
