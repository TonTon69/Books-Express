const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/signin", authController.signin);
router.post("/signin", authController.postSignin);

module.exports = router;
