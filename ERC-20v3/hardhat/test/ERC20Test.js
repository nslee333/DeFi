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

    it("Should return and log the name, symbol, decimals, totalSupply of the token contract", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    let txn = await contract.name();
    console.log(txn);

    txn = await contract.symbol();
    console.log(txn);

    txn = await contract.decimals();
    console.log(txn);

    txn = await contract.totalSupply();
    console.log(txn);

  });

  it("Should mint a token from the contract, and display the balance of a user." , async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    let value = "0.000001";

    let txn = await contract.mint(
      1,
      {
        value: utils.parseEther(value),
      }
    );
    await txn.wait();
    
    // Need to write commented-out tests for checking the require statements.

    // Also need to Rewrite/rethink the mint functionality.
    


  });

  it("Should be able to use the approve function, and emit an approval event", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");


    let tx = await contract.approve(address1.address, address2.address, value);
    await tx.wait();

    await expect(contract.approve(address1.address, address2.address, value))
    .to.emit(contract, "Approval")
    .withArgs(address1.address, address2.address, value);



  });
  
  it("Calls the approve function with bad arguments to check the require statements.", async () => {

    // Doesn't work right now, not sure if this is possible.
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

        
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address2.address],
    });

    const signer = await ethers.getSigners(address2.address);


    signer.sendTransaction(
    tx = await contract.approve(address1.address, address2.address, value)
    );
    await tx.wait();

    

  });

  it("Should display the allowance approvals of this account", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");


    let tx = await contract.approve(address1.address, address2.address, value);
    await tx.wait();

    tx = await contract.allowance(address1.address, address2.address);
    console.log(tx);

  });

  it("It should increase the allowance of a user", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const [ address1, address2 ] = await ethers.getSigners();

    const value = utils.parseEther("0.01");


    let tx = await contract.increaseAllowance(address1.address, address2.address, value);
    await tx.wait();
  });

  it("Should decrease the allowance of a user", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const [address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.000000001");

    let tx = await contract.decreaseAllowance(address1.address, address2.address, value);
    await tx.wait();    

  });

 




  it("Current test", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();
    console.log("Successfully deployed");

    const [address1, address2] = await ethers.getSigners();



   
  // let zeroAddress = ethers.constants.AddressZero;

  // const value = utils.parseEther("1");

  // let tx = await contract.decreaseAllowance(address1.address, address2.address, 0);

  

    
 
  });





});