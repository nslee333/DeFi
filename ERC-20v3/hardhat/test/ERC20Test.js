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
  


    it("Should log the name of the token from the contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.name();
    console.log(txn);

  });



  it("Should log the symbol of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.symbol();
    console.log(txn);


  });

  it("Should log the decimal number of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.decimals();
    console.log(txn.toString());

  });


  it("Should log the total supply of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.totalSupply();
    console.log(txn.toString());
    
  });



  it("Should mint an amount of tokens." , async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let value = "0.000001";

    let txn = await contract.mint(
      1,
      {
        value: utils.parseEther(value),
      }
    );
    await txn.wait();

    expect(txn.value).to.equal(utils.parseEther(value));

  });

  it("Should test the second require statement by passing incorrect values to the function, should revert the transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let value = "0.000000000000000001";

    let txn = await expect (contract.mint(
      1, 
      {
        value: utils.parseEther(value),
      }
    )).to.be.reverted;

  });


  it("Should call the approve function.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const value = "0.00001";
    const value2 = utils.parseEther("0.00001");


    let tx = await contract.approve(
      address1.address, 
      address2.address,
      value2,
      {
        value: utils.parseEther(value),
      } 
    );
    await tx.wait();

    expect(tx.value).to.equal(value2);

  });

  it("Should call the approve function and emit an approval event.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");


    let tx = await contract.approve(address1.address, address2.address, value);
    await tx.wait();

    await expect(contract.approve(address1.address, address2.address, value))
    .to.emit(contract, "Approval")
    .withArgs(address1.address, address2.address, value);

  });

  
  it("Calls the approve function with a signer that is not the owner of the funds, should revert transaction.", async () => {

    // Doesn't work right now, not sure if this is possible.
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect (connectedContract.approve(address1.address, address2.address, value)).to.be.reverted;

  });

  it("Calls the approve function, with the spender address equal to the zero address, should revert transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

    const spender = ethers.constants.AddressZero;

    await expect(contract.approve(address1.address, spender, value)).to.be.reverted;

  });

  it("Should call the allowance function, which returns the approval amount (owner, spender).", async () => { // Is it possible to eliminate the approve call?
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");


    let tx = await contract.approve(address1.address, address2.address, value);
    await tx.wait();

    tx = await contract.allowance(address1.address, address2.address);
    console.log(tx);

  });

  it("Should increase the allowance of a user.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [ address1, address2 ] = await ethers.getSigners();

    const value = utils.parseEther("0.01");


    let tx = await contract.increaseAllowance(address1.address, address2.address, value);
    await tx.wait();
  });

  it("Should decrease the allowance of a user", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.000000001");

    let tx = await contract.decreaseAllowance(address1.address, address2.address, value);
    await tx.wait();    

  });

 




  it("Current test", async () => { 
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();



   
  // let zeroAddress = ethers.constants.AddressZero;

  // const value = utils.parseEther("1");

  // let tx = await contract.decreaseAllowance(address1.address, address2.address, 0);

  

    
 
  });





});