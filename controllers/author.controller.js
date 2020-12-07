const Author = require("../models/author.model");
const User = require("../models/user.model");

module.exports.index = async (req, res) => {
  const authors = await Author.find({});
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("authors/index", {
    authors: authors,
    user,
  });
};

module.exports.create = (req, res) => {
  res.render("authors/create");
};
module.exports.postCreate = (req, res, next) => {
  const author = new Author(req.body);
  author
    .save()
    .then(() => {
      res.redirect("/shop/stored/authors");
    })
    .catch(next);
};

module.exports.search = async (req, res) => {
  const authors = await Author.find({}).sort({ _id: -1 });
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  const matchedAuthors = authors.filter((author) => {
    return (
      author.name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1
    );
  });
  res.render("authors/index", {
    authors: matchedAuthors,
    values: req.body,
    user,
  });
};
module.exports.show = async (req, res) => {
  const author = await Author.findOne({ slug: req.params.slug });
  const userId = req.signedCookies.userId;
  const user = await User.findById(userId);
  res.render("authors/show", {
    author: author,
    user,
  });
};
module.exports.edit = async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.render("authors/edit", {
    author: author,
  });
};
module.exports.update = async (req, res) => {
  await Author.updateOne({ _id: req.params.id }, req.body);
  res.redirect("/shop/stored/authors");
};
module.exports.delete = async (req, res) => {
  await Author.deleteOne({ _id: req.params.id });
  res.redirect("back");
};
