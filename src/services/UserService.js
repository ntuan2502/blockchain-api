const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Block = require("../models/Block");
const bcrypt = require("bcrypt");
const hash = require("crypto-js/sha256");

module.exports = class UserService {
  async profile(userId, code) {
    const user = await User.findById(userId);
    if (!user) {
      return {
        code,
        success: false,
        message: "User not found.",
      };
    }

    return JSON.stringify({
      code,
      success: true,
      message: "Get user profile successfully.",
      data: user,
    });
  }

  async send(userId, body, code) {
    const userSend = await User.findById(userId);
    if (!userSend) {
      return {
        code,
        success: false,
        message: "User send not found.",
      };
    }

    if (body.to.match(/^[0-9a-fA-F]{24}$/)) {
      const userReceived = await User.findById(body.to);
      if (!userReceived) {
        return {
          code,
          success: false,
          message: "User receive not found.",
        };
      }
      const transaction = new Transaction();

      transaction.from = body.from;
      transaction.to = body.to;
      transaction.coin = body.coin;

      userSend.coin -= body.coin;
      userReceived.coin = Number(userReceived.coin) + Number(body.coin);
      transaction.save();
      userSend.save();
      userReceived.save();
      return JSON.stringify({
        code,
        success: true,
        message: "Send coin successfully.",
      });
    } else {
      return {
        code,
        success: false,
        message: "User receive not found.",
      };
    }
  }

  async transaction(userId, code) {
    const user = await User.findById(userId);
    if (!user) {
      return {
        code,
        success: false,
        message: "User not found.",
      };
    }

    const transactions = await Transaction.find({
      $or: [{ from: user._id }, { to: user._id }],
    });

    return JSON.stringify({
      code,
      success: true,
      message: "Get user profile successfully.",
      data: transactions,
    });
  }

  async getBlock(userId, code) {
    function calculateHash(block) {
      return hash(
        block.prevHash +
          JSON.stringify(block.data) +
          block.timeStamp +
          block.mineVar
      ).toString();
    }

    function mine(block, difficulty) {
      while (!block.hash.startsWith("0".repeat(difficulty))) {
        block.mineVar++;
        block.hash = calculateHash(block);
      }
      return block;
    }

    async function getLastBlock() {
      const lastBlock = await Block.find().sort({ _id: -1 }).limit(1);
      return lastBlock[0];
    }

    async function addBlock(data) {
      const lastBlock = await getLastBlock();
      const newBlock = new Block();
      newBlock.prevHash = lastBlock.hash;
      newBlock.data = data;
      newBlock.coin = 10;
      newBlock.save();
      const bl = mine(newBlock, 4);
      // newBlock.mineVar = bl.mineVar;
      // newBlock.hash = bl.hash;
      // newBlock.save();
      return newBlock;
    }

    async function isValid() {
      const blocks = await Block.find();
      for (let i = 1; i < blocks.length; i++) {
        const currentBlock = blocks[i];
        const prevBlock = blocks[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
        if (currentBlock.prevHash !== prevBlock.hash) return false;
      }
      return true;
    }

    const block = await Block.findOne({});
    if (!block) {
      const newBlock = new Block();
      newBlock.save();
      newBlock.hash = calculateHash(newBlock);
      newBlock.save();
    }

    const newBlock = await addBlock({ userId });

    const user = await User.findById(userId);
    user.coin = Number(user.coin) + Number(newBlock.coin);
    user.save();
    const transaction = new Transaction();
    transaction.from = "Mining";
    transaction.to = userId;
    transaction.coin = newBlock.coin;
    transaction.save();

    return JSON.stringify({
      code,
      success: true,
      message: "Mine successfully.",
      data: {
        newBlock,
      },
    });
  }

  async findAllBlock(userId, code) {
    const blocks = await Block.find();
    return JSON.stringify({
      code,
      success: true,
      message: "Get all block successfully.",
      data: blocks,
    });
  }
};
