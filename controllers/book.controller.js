const Book = require("../models/book.model");

module.exports.index = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.render("books/index", {
        books: books,
      });
    })
    .catch(next);
};

module.exports.search = (req, res) => {
  const name_book = req.query.name;
  const matchedBooks = books.filter((book) => {
    return book.name.toLowerCase().indexOf(name_book.toLowerCase()) !== -1;
  });
  res.render("books/index", {
    books: matchedBooks,
  });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};
module.exports.postCreate = (req, res, next) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.redirect("/books");
    })
    .catch(next);
};
module.exports.show = (req, res, next) => {
  Book.findOne({ slug: req.params.slug })
    .then((book) => {
      res.render("books/show", {
        book: book,
      });
    })
    .catch(next);
};
