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
    expect(txn).to.equal("Nate Token");

  });



  it("Should log the symbol of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.symbol();
    expect(txn).to.equal("NT");


  });

  it("Should log the decimal number of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.decimals();
    expect(txn).to.equal(18);

  });


  it("Should log the total supply of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.totalSupply();
    expect(txn).to.equal(BigNumber.from("1000000000000000000000000"));
    
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

  it("Should test the second require statement of the mint function, should revert the transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let value = "0.000000000000000001";

    let txn = await expect (contract.mint(
      1, 
      {
        value: utils.parseEther(value),
      }
    )).to.be.revertedWith("Not enough ether sent.");

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
      value2
    );
    await tx.wait();

    expect(tx).to.not.be.reverted;

  });

  it("Should call the approve function and emit an approval event.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");


    let tx = await contract.approve(address1.address, address2.address, value);
    await tx.wait(); 

    expect(tx).to.not.be.reverted;

    await expect(contract.approve(address1.address, address2.address, value))
    .to.emit(contract, "Approval")
    .withArgs(address1.address, address2.address, value);

  });

  
  it("Calls the approve function with a signer that is not the owner of the funds, should revert transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect (connectedContract.approve(address1.address, address2.address, value)).to.be.revertedWith("Cannot approve without the owner's confirmation.");

  });

  it("Calls the approve function, with the spender address equal to the zero address, should revert transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

    const spender = ethers.constants.AddressZero;

    await expect(contract.approve(address1.address, spender, value)).to.be.revertedWith("Cannot give approval to a zero address.");

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

    expect(tx).to.equal("100000000000000");

  });


  it("Should test the first require statement in the allowance function, should revert the transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

    const addressZero = ethers.constants.AddressZero;

    await expect(contract.allowance(addressZero, address2.address)).to.be.revertedWith("Please enter a valid owner account.");

  });

  it("Should test the second require in the allowance function, should revert the transaction.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();

    const addressZero = ethers.constants.AddressZero;

    await expect(contract.allowance(address1.address, addressZero)).to.be.revertedWith("Please enter a valid spender address.");

  });


  it("Should increase the allowance of a user.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [ address1, address2 ] = await ethers.getSigners();

    const value = utils.parseEther("0.01");


    let tx = await contract.increaseAllowance(address1.address, address2.address, value);
    await tx.wait();

    expect(tx).to.not.be.reverted;
  });


  it("Should revert at the first require statement of increaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.increaseAllowance(addressZero, address1.address, value)).to.be.revertedWith("Cannot withdraw funds from address(0).");

  });

  it("Should revert at the second require statement of increaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.increaseAllowance(address1.address, addressZero, value)).to.be.revertedWith("Spender cannot be address(0).");

  });


  it("Should revert at the third require statement of increaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const value = utils.parseEther("0");

    await expect(contract.increaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Cannot increase allowance to zero.");

  });

  it("Should revert at the fourth require statement of increaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect(connectedContract.increaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Only the owner can increase the allowance.");

  });






  it("Should decrease the allowance of a user.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.000000001");

    let tx = await contract.decreaseAllowance(address1.address, address2.address, value);
    await tx.wait(); 
    
    expect(tx).to.not.be.reverted;

  });


  it("Should revert at the first require statement of decreaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.decreaseAllowance(addressZero, address1.address, value)).to.be.revertedWith("Cannot withdraw funds from address(0).");

  });

  it("Should revert at the second require statement of decreaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.decreaseAllowance(address1.address, addressZero, value)).to.be.revertedWith("Spender cannot be address(0).");

  });


  it("Should revert at the third require statement of decreaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const value = utils.parseEther("0");

    await expect(contract.decreaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Cannot decrease allowance to zero.");

  });

  it("Should revert at the fourth require statement of decreaseAllowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect(connectedContract.decreaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Only the owner can decrease the allowance.");

  });


  it("Should successfully transfer tokens from one address to another.", async () => { 
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const connectedContract = await contract.connect(address1);
    const amount = "0.0001";
    const value = utils.parseEther("0.0001");


    const tx = await connectedContract.mint(
      1, 
      {
        value: utils.parseEther(amount),
      }
    );
    await tx.wait();


    // Transfer an amount of tokens from address1. to address2.

    
    
 
  });





});