const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");

router.get("/stored/books", shopController.storedBooks);
// router.get("/search", shopController.search);
// router.get("/create", shopController.create);
// router.post("/create", shopController.postCreate);
// router.get("/:slug", shopController.show);

module.exports = router;
