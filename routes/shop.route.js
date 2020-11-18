const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get(
  "/stored/books",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  shopController.storedBooks
);

module.exports = router;
