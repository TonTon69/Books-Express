const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", authorController.index);
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
router.get("/search", authorController.search);
router.get("/:slug", authorController.show);
router.get(
  "/:id/edit",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  authorController.edit
);
router.post(
  "/:id",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  authorController.update
);
router.delete(
  "/:id",
  authMiddleware.requireAuth,
  adminMiddleware.isAdmin,
  authorController.delete
);

module.exports = router;
