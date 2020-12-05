const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");
const Book = require("../models/book.model");

module.exports.create = (req, res, next) => {
  res.render("transfer/create", {
    csrfToken: req.csrfToken(),
  });
};
module.exports.postCreate = (req, res, next) => {
  const transfer = new Transfer({
    amount: parseInt(req.body.amount),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId,
  });
  transfer
    .save()
    .then(() => {
      res.redirect("/transfer/create");
    })
    .catch(next);
};
