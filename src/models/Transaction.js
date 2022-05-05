const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Transaction = new Schema(
  {
    from: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    coin: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", Transaction);
