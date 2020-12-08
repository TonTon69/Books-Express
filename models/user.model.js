const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, require: true },
    avatar: { type: String },
    role: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
