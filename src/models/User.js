const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    coin: {
      type: Number,
      default: 1000000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
