require("@nomicfoundation/hardhat-toolbox");
require('./tasks')

/** @type import('hardhat/config').HardhatUserConfig */

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "QYabFPuJ3AfWlpgh8svKK4XJ_Yj9FUz4";

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = "861641d2e355482a343b6d5ca94d9f6ce6ef6c05be0aefc41f8f716944ba744c";



module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};