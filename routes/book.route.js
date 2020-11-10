const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
router.get("/:slug", controller.show);

module.exports = router;
