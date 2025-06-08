const crypto = require('crypto');

class Block 
{// Represents a single block in the blockchain
    // Each block contains an index, timestamp, data, previous hash, nonce, and its own hash
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() // Calculates the hash of the block using SHA-256
    // The hash is computed based on the block's index, timestamp, data, previous hash, and nonce
    {
        const value = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
        return crypto.createHash('sha256').update(value).digest('hex');
    }

    mineBlock(difficulty)// Mines the block by finding a hash that starts with a certain number of leading zeros (difficulty)
    // The nonce is incremented until the hash meets the difficulty requirement
     {
        console.log(`Mining block ${this.index}...`);
        const startTime = Date.now(); // Start timer

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
            // console.log(`Nonce: ${this.nonce}, Hash: ${this.hash}`);
        }

        const endTime = Date.now(); // Stop timer
        console.log(`Block ${this.index} mined!`);
        console.log(`Nonce: ${this.nonce}, Hash: ${this.hash}`);
        console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
    }
}

class Blockchain 
{// Represents the blockchain itself
    // The blockchain is initialized with a genesis block and a difficulty level for mining
    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock() // Creates the first block in the blockchain, known as the genesis block
    {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    addBlock(data) // Adds a new block to the blockchain
    {
        const previousBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(this.chain.length, Date.now(), data, previousBlock.hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    displayChain() // Displays the entire blockchain
    {
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

// Instantiate blockchain with difficulty level set to 4 (hash must start with "0000")
const blockchain = new Blockchain(4);
blockchain.addBlock({ message: "Block 1 Data" });
blockchain.addBlock({ message: "Block 2 Data" });
blockchain.addBlock({ message: "Block 3 Data" });

// Display the blockchain
blockchain.displayChain();
