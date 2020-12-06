const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Author", authorSchema);
