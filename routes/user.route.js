const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/signup", controller.signup);
router.post("/signup", controller.postCreate);

module.exports = router;
