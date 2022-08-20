require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      gas: 21000,
    }
  },
  solidity: "0.8.9",
  accounts: {
    accountsBalance: "10000000000000000000000",
  }
};