// Generate random values for validator selection
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mock Validators
const miner = { name: "Miner A", power: getRandomInt(500, 1000) }; // PoW: Mining power
const staker = { name: "Staker B", stake: getRandomInt(50, 2000) }; // PoS: Staking amount
const voters = [
    { name: "Voter 1", vote: "Delegate C" },
    { name: "Voter 3", vote: "Delegate C" },
    { name: "Voter 2", vote: "Delegate D" },
    { name: "Voter 4", vote: "Delegate E" }
]; // DPoS: Voting system

// **Simulate PoW (Highest Power Wins)**
const powValidator = miner;
console.log(` PoW Consensus: Selected Validator → ${powValidator.name} (Power: ${powValidator.power})`);
console.log("Selection Logic: The miner with the highest power wins the right to validate blocks.");

// **Simulate PoS (Highest Stake Wins)**
const posValidator = staker;
console.log(`PoS Consensus: Selected Validator → ${posValidator.name} (Stake: ${posValidator.stake})`);
console.log(" Selection Logic: The validator with the highest stake wins, showing financial commitment.");

// **Simulate DPoS (Majority Vote Wins)**
const voteCounts = voters.reduce((acc, voter) => {
    acc[voter.vote] = (acc[voter.vote] || 0) + 1;
    return acc;
}, {});

const dposValidator = Object.keys(voteCounts).reduce((a, b) => (voteCounts[a] > voteCounts[b] ? a : b));
console.log(`DPoS Consensus: Selected Delegate → ${dposValidator}`);
console.log("Selection Logic: The delegate with the most votes is chosen to validate blocks.");
