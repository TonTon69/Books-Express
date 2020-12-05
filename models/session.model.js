const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    cart: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { minimize: false }
);
module.exports = mongoose.model("Session", sessionSchema);
