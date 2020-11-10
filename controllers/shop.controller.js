const Book = require("../models/book.model");

module.exports.storedBooks = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.render("shop/stored-books", {
        books: books,
      });
    })
    .catch(next);
};
