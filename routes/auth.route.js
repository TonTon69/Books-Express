const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/signin", authController.signin);
router.post("/signin", authController.postSignin);
router.get("/settings", authController.settings);
router.get("/settings/account", authController.account);
router.get("/logout", authController.logout);

module.exports = router;
