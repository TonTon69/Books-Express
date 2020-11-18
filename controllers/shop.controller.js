const Book = require("../models/book.model");
const User = require("../models/user.model");

module.exports.storedBooks = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.render("shop/stored-books", {
        books: books,
      });
    })
    .catch(next);
};
module.exports.storedUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.render("shop/stored-users", {
        users: users,
      });
    })
    .catch(next);
};
