const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { utils, FixedNumber, BigNumber, formatEther, parseUnits, constants } = require("ethers");
const { supportWithArgs } = require("@nomicfoundation/hardhat-chai-matchers/internal/withArgs");

describe("ERC20", function () {
  it("... :)", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const [address1, address2] = await ethers.getSigners();



   
  let zeroAddress = ethers.constants.AddressZero;

  const value = utils.parseEther("1");

  let tx = await contract.decreaseAllowance(address1.address, address2.address, 0);

  

    
 
  });



});