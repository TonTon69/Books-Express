const Book = require("../models/book.model");
const User = require("../models/user.model");
const Author = require("../models/author.model");

module.exports.storedBooks = async (req, res) => {
  const books = await Book.find({});
  res.render("shop/stored-books", {
    books: books,
  });
};
module.exports.storedUsers = async (req, res) => {
  const users = await User.find({});
  res.render("shop/stored-users", {
    users: users,
  });
};
module.exports.storedAuthors = async (req, res) => {
  const authors = await Author.find({});
  res.render("shop/stored-authors", {
    authors: authors,
  });
};
