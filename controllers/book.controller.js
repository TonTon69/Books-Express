const Book = require("../models/book.model");
const User = require("../models/user.model");

module.exports.index = (req, res, next) => {
  Book.find({})
    .then((books) => {
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            res.render("books", {
              books: books,
            });
          } else {
            res.render("books", {
              books: books,
            });
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.search = (req, res, next) => {
  Book.find({})
    .sort({ _id: -1 })
    .then((books) => {
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            const matchedBooks = books.filter((book) => {
              return (
                book.name
                  .toLowerCase()
                  .indexOf(req.query.name.toLowerCase()) !== -1
              );
            });
            res.render("books/index", {
              books: matchedBooks,
              values: req.body,
            });
          }
        })
        .catch(next);
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
module.exports.edit = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.render("books/edit", {
        book: book,
      });
    })
    .catch(next);
};
module.exports.update = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/shop/stored/books"))
    .catch(next);
};
module.exports.delete = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
};
