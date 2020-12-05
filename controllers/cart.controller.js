const Session = require("../models/session.model");

module.exports.addToCart = (req, res, next) => {
  const bookId = req.params.id;
  const sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  Session.find({ id: sessionId }).then(() => {
    res.redirect("/books");
  });
};
