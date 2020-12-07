const Book = require("../models/book.model");
const User = require("../models/user.model");
const Author = require("../models/author.model");

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 6;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  let isEmptyBooks = false;

  const books = await Book.find({}).sort({ _id: -1 });
  const bookFilter = books.slice(start, end);
  if (bookFilter.length === 0) {
    isEmptyBooks = true;
  }
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("books", {
    books: bookFilter,
    page: page,
    isEmptyBooks: isEmptyBooks,
    user,
  });
};

module.exports.search = async (req, res) => {
  const books = await Book.find({}).sort({ _id: -1 });
  const matchedBooks = books.filter((book) => {
    return book.name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1;
  });
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("books/index", {
    books: matchedBooks,
    values: req.body,
    user,
  });
};

module.exports.create = async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/create", {
      authors: authors,
      book: book,
    });
  } catch {
    res.redirect("/books");
  }
};
module.exports.postCreate = async (req, res) => {
  const book = new Book(req.body);
  const newBook = await book.save();
  res.redirect("/shop/stored/books");
};
module.exports.show = async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });
  const author = await Author.find({});
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("books/show", {
    book: book,
    author: author,
    user,
  });
};
module.exports.edit = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("books/edit", {
    book: book,
  });
};
module.exports.update = async (req, res) => {
  await Book.updateOne({ _id: req.params.id }, req.body);
  res.redirect("/shop/stored/books");
};
module.exports.delete = async (req, res) => {
  await Book.deleteOne({ _id: req.params.id });
  res.redirect("back");
};
