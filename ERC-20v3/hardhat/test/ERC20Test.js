const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { utils, FixedNumber, BigNumber, formatEther } = require("ethers");

describe("ERC20", function () {
  it("Should Mint successfully", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const deployedContract = await deploy1.deploy("Nate Token", "NT");
    await deployedContract.deployed();
    console.log("Successfully deployed");



      const value = 0.001 * 1;
      // const decimals = 18;

      const newValue = utils.parseUnits(value.toString());
      let one = 1;



      const txn = await deployedContract.mint(
        one, {
          value: utils.parseEther(value.toString()),
        } 
      );

      // await txn.wait();



  })

  // it("log the values from the contract", async () => {
  //   const deploy1 = await ethers.getContractFactory("ERC20");
  //   const deployedContract = await deploy1.deploy("Nate Token", "NT");
  //   await deployedContract.deployed();
  //   console.log("Successfully deployed");



  //   const tx = await deployedContract.totalSupply();
  //   console.log(tx);


  // });



});