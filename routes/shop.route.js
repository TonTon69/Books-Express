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

router.get(
  "/stored/users",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  shopController.storedUsers
);

router.get(
  "/stored/authors",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  shopController.storedAuthors
);

module.exports = router;
