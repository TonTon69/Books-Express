const express = require("express");
const router = express.Router();
const controller = require("../controllers/shop.controller");

router.get("/stored/books", controller.storedBooks);
// router.get("/search", controller.search);
// router.get("/create", controller.create);
// router.post("/create", controller.postCreate);
// router.get("/:slug", controller.show);

module.exports = router;
