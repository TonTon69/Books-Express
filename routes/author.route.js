const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", authorController.index);
router.get("/search", authorController.search);
router.get(
  "/create",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  authorController.create
);
router.post(
  "/create",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  authorController.postCreate
);

module.exports = router;
