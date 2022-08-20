const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { utils, FixedNumber, BigNumber, formatEther } = require("ethers");

describe("ERC20", function () {
  it("Should display the balance of the msg.sender.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const deployedContract = await deploy1.deploy("Nate Token", "NT");
    await deployedContract.deployed();
    console.log("Successfully deployed");






      



  })



});