require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");


const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;




module.exports = {

  networks: {
    goerli: {
      url: ALCHEMY_KEY,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },

  solidity: {
    version: "0.8.9",
  },
};
