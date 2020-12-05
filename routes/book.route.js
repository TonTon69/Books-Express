const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", bookController.index);
router.get("/search", bookController.search);
router.get(
  "/create",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  bookController.create
);
router.post(
  "/create",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  bookController.postCreate
);
router.get("/:slug", bookController.show);
router.get(
  "/:id/edit",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  bookController.edit
);
router.post(
  "/:id",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  bookController.update
);
router.delete(
  "/:id",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  bookController.delete
);
module.exports = router;
