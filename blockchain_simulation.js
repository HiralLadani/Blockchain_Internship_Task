const crypto = require('crypto');

class Block {
 // Represents a single block in the blockchain
    // Each block contains an index, timestamp, data, previous hash, nonce, and its own hash
      // The constructor initializes the block with its index, timestamp, data, previous hash, and calculates its hash
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }
// Calculates the hash of the block using SHA-256
    // The hash is computed based on the block's index, timestamp, data, previous hash, and nonce
    calculateHash() {
        const value = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
        return crypto.createHash('sha256').update(value).digest('hex');
    }
// Mines the block by finding a hash that starts with a certain number of leading zeros (difficulty)
    // The nonce is incremented until the hash meets the difficulty requirement
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    addBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(this.chain.length, Date.now(), data, previousBlock.hash);
        newBlock.mineBlock(2);  // Adjust difficulty level if needed
        this.chain.push(newBlock);
    }

    displayChain() {
        this.chain.forEach(block => {
            console.log(`Index: ${block.index}`);
            console.log(`Timestamp: ${block.timestamp}`);
            console.log(`Data: ${JSON.stringify(block.data)}`);
            console.log(`Previous Hash: ${block.previousHash}`);
            console.log(`Hash: ${block.hash}`);
            console.log(`Nonce: ${block.nonce}`);
            console.log('-'.repeat(50));
        });
    }
}

// Creating the blockchain and adding three linked blocks
const blockchain = new Blockchain();
blockchain.addBlock({ message: "Block 1 Data" });
blockchain.addBlock({ message: "Block 2 Data" });
blockchain.addBlock({ message: "Block 3 Data" });

//

// Display the blockchain
blockchain.displayChain();
// Modify Block 1's data and recalculate its hash
blockchain.chain[1].data = { message: "Tampered Block 1 Data" };
blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

// Display the blockchain after tampering
console.log("Blockchain after modifying Block 1:");
blockchain.displayChain();
