const Product = require("../models/product.model");

module.exports.index = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.render("products/index", {
        products: products,
      });
    })
    .catch(next);
};

module.exports.search = (req, res) => {
  const products = Product.find().sort({ _id: -1 });
  const matchedProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().indexOf(req.query.name.toLowerCase()) >= 0
    );
  });
  res.render("products/index", {
    products: matchedProducts,
  });
};

module.exports.create = (req, res) => {
  res.render("products/create");
};
module.exports.postCreate = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.redirect("/products");
    })
    .catch(next);
};
