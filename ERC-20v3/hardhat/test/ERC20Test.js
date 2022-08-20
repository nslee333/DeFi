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

    // const amount = BigNumber.from("50000000000000000");
    // console.log(amount, "amount");

    // const zero = 0x0000000000000000000000000000000000000000;

   
    // const tx = await contract.approve(address1.address, address2.address, amount);

    

    
    // console.log(event, "Approval Event emitted successfully")
    
  //   await tx.wait();
  //   console.log(tx, "Approval confirmation");
  let address = ethers.constants.AddressZero;
  

    
    const confirm = await contract.mint(
      
    );
    console.log(confirm, "mint confirmation");

  //   const amount2 = BigNumber.from("30000000000000000");

  //   const datxn = await contract.decreaseAllowance(address1.address, address2.address, amount2);
  //   await datxn.wait();
  //   console.log(datxn, "datxn confirmation");



  //  const amount3 = BigNumber.from("50000000000000000");
  //  const datxn2 = await contract.increaseAllowance(address1.address, address2.address, amount3);
  //  await datxn2.wait();
  //  console.log(datxn2, "allowance increase confirmation");

    // 0x0000000000000000000000000000000000000000

  });



});