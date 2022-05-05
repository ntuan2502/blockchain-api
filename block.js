const hash = require("crypto-js/sha256");

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date();

    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  calculateHash() {
    return hash(
      this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar
    ).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.mineVar++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor(difficulty) {
    const genesisBlock = new Block("0000", { isGenesisBlock: true });

    this.difficulty = difficulty;
    this.chain = [genesisBlock];
  }

  addBlock(data) {
    const lastBlock = this.getLastBlock();
    const newBlock = new Block(lastBlock.hash, data);
    console.log("Start mining...");
    console.time("mining");
    newBlock.mine(this.difficulty);
    console.time("mining");
    console.log("End mining... ", newBlock);

    this.chain.push(newBlock);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevHash = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.prevHash !== prevHash.hash) return false;
    }
    return true;
  }
}

const bc = new Blockchain(4);
console.log(bc.chain);

console.log("BC mining in progress....");
bc.addBlock({
  sender: "Iris Ljesnjanin",
  recipient: "Cosima Mielke",
  quantity: 50,
});

bc.addBlock({
  sender: "Vitaly Friedman",
  recipient: "Ricardo Gimenes",
  quantity: 100,
});

console.log(bc.chain);
console.log("Chain valid: ", bc.isValid());
