const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.get("/", bookController.index);
router.get("/search", bookController.search);
router.get("/create", bookController.create);
router.post("/create", bookController.postCreate);
router.get("/:slug", bookController.show);
router.get("/:id/edit", bookController.edit);
router.post("/:id", bookController.update);
router.delete("/:id", bookController.delete);
module.exports = router;
