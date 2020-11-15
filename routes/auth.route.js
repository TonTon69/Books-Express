const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.get("/signin", controller.signin);
router.post("/signin", controller.postSignin);

module.exports = router;
