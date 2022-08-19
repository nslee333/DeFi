const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { utils, FixedNumber, BigNumber, formatEther } = require("ethers");

describe("ERC20", function () {
  it("Should Mint successfully", async () => {
    const deploy1 = await ethers.getContractFactory("ERC20");
    const deployedContract = await deploy1.deploy("Nate Token", "NT");
    await deployedContract.deployed();
    console.log("Successfully deployed");



      const value = 0.000001 * 1;
      // const decimals = 18;

      const newValue = utils.parseUnits(value.toString());


      console.log(utils.parseEther(value.toString()));



      const txn = await deployedContract.mint(
        1,
        {
          value: utils.parseEther(newValue.toString()),
        } 
      );
      txn.gasLimit(2100000);
      await txn.wait();



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