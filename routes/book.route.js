const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", bookController.index);
router.get("/search", bookController.search);
router.get("/create", bookController.create);
router.post("/create", bookController.postCreate);
router.get("/:slug", authMiddleware.requireAuth, bookController.show);
router.get("/:id/edit", bookController.edit);
router.post("/:id", bookController.update);
router.delete("/:id", bookController.delete);
module.exports = router;
