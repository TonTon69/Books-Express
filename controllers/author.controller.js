const Author = require("../models/author.model");
const User = require("../models/user.model");

module.exports.index = (req, res, next) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  Author.find({})
    .then((authors) => {
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            res.render("authors/index", {
              authors: authors,
              searchOptions: req.query,
            });
          } else {
            res.render("authors/index", {
              authors: authors,
              searchOptions: req.query,
            });
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.create = (req, res) => {
  res.render("authors/create");
};
module.exports.postCreate = (req, res, next) => {
  const author = new Author(req.body);
  author
    .save()
    .then(() => {
      res.redirect("/authors");
    })
    .catch(next);
};

module.exports.search = (req, res, next) => {
  Author.find({})
    .sort({ _id: -1 })
    .then((authors) => {
      const matchedAuthors = authors.filter((author) => {
        return (
          author.name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1
        );
      });
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            res.render("authors/index", {
              authors: matchedAuthors,
              values: req.body,
            });
          } else {
            res.render("authors/index", {
              authors: matchedAuthors,
              values: req.body,
            });
          }
        })
        .catch(next);
    })
    .catch(next);
};
module.exports.show = (req, res, next) => {
  Author.findOne({ slug: req.params.slug })
    .then((author) => {
      User.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            res.render("authors/show", {
              author: author,
            });
          } else {
            res.render("authors/show", {
              author: author,
            });
          }
        })
        .catch(next);
    })
    .catch(next);
};
