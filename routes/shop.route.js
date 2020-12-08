const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");

router.get("/stored/books", shopController.storedBooks);
router.get("/stored/users", shopController.storedUsers);
router.get("/stored/authors", shopController.storedAuthors);

module.exports = router;
