const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Block = new Schema(
  {
    prevHash: {
      type: String,
      default: "0000",
    },
    data: {
      type: Object,
      default: null,
    },
    coin: {
      type: Number,
      default: 0,
    },
    hash: {
      type: String,
      default: "hash",
    },
    mineVar: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Block", Block);
