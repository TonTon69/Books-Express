const Session = require(".././models/session.model");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    const session = new Session({
      cart: {},
    });
    res.cookie("sessionId", session.id, {
      signed: true,
    });
  }
  next();
};
