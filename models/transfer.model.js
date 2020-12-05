const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transferSchema = new Schema(
  {
    userId: { type: String },
    bookId: { type: String },
    userName: { type: String },
    bookName: { type: String },
    amount: { type: Number },
    accountId: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Transfer", transferSchema);
