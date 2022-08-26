const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { utils, FixedNumber, BigNumber, formatEther, parseUnits, constants, toNumber } = require("ethers");
const { supportWithArgs } = require("@nomicfoundation/hardhat-chai-matchers/internal/withArgs");



describe("ERC20", function () {
  


    it("Name function: Should log the name of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.name();
    expect(txn).to.equal("Nate Token");

  });



  it("Symbol function: Should log the symbol of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.symbol();
    expect(txn).to.equal("NT");


  });

  it("Decimals function: Should log the decimal amount of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.decimals();
    expect(txn).to.equal(18);

  });


  it("TotalSupply Function: Should log the total supply of the token contract.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    let txn = await contract.totalSupply();
    expect(txn).to.equal(BigNumber.from("1000000000000000000000000"));
    
  });



  it("Mint function: Should mint an amount of tokens." , async () => {
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

  it("Mint function: Should revert at the second require statement.", async () => {
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


  it("Approve function: Should successfully call the approve function.", async () => {
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

  it("Approve function: Should emit an Approval event after a successful approve call.", async () => {
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

  
  it("Approve function: Should revert at the first require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect (connectedContract.approve(address1.address, address2.address, value)).to.be.revertedWith("Cannot approve without the owner's confirmation.");

  });

  it("Approve function: Should revert at the second require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

    const spender = ethers.constants.AddressZero;

    await expect(contract.approve(address1.address, spender, value)).to.be.revertedWith("Cannot give approval to a zero address.");

  });

  it("Allowance function: Should successfully return the approved allowance.", async () => { // Is it possible to eliminate the approve call?
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


  it("Allowance function: Should revert at the first require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const[address2] = await ethers.getSigners();

    const value = utils.parseEther("0.0001");

    const addressZero = ethers.constants.AddressZero;

    await expect(contract.allowance(addressZero, address2.address)).to.be.revertedWith("Please enter a valid owner account.");

  });

  it("Allowance function: Should revert at the second require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();

    const addressZero = ethers.constants.AddressZero;

    await expect(contract.allowance(address1.address, addressZero)).to.be.revertedWith("Please enter a valid spender address.");

  });


  it("IncreaseAllowance function: Should successfully increase the allowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [ address1, address2 ] = await ethers.getSigners();

    const value = utils.parseEther("0.01");


    let tx = await contract.increaseAllowance(address1.address, address2.address, value);
    await tx.wait();

    expect(tx).to.not.be.reverted;
  });


  it("IncreaseAllowance function: Should revert at the first require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.increaseAllowance(addressZero, address1.address, value)).to.be.revertedWith("Cannot withdraw funds from address(0).");

  });

  it("IncreaseAllowance function: Should revert at the second require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.increaseAllowance(address1.address, addressZero, value)).to.be.revertedWith("Spender cannot be address(0).");

  });


  it("IncreaseAllowance function: Should revert at the third require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const value = utils.parseEther("0");

    await expect(contract.increaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Cannot increase allowance to zero.");

  });

  it("IncreaseAllowance function: Should revert at the fourth require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect(connectedContract.increaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Only the owner can increase the allowance.");

  });


  it("DecreaseAllowance function: Should successfully decrease the allowance.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const value = utils.parseEther("0.000000001");

    let tx = await contract.decreaseAllowance(address1.address, address2.address, value);
    await tx.wait(); 
    
    expect(tx).to.not.be.reverted;

  });


  it("DecreaseAllowance function: Should revert at the first require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.decreaseAllowance(addressZero, address1.address, value)).to.be.revertedWith("Cannot withdraw funds from address(0).");

  });

  it("DecreaseAllowance function: Should revert at the second require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1] = await ethers.getSigners();
    const addressZero = ethers.constants.AddressZero;
    const value = utils.parseEther("0.01");

    await expect(contract.decreaseAllowance(address1.address, addressZero, value)).to.be.revertedWith("Spender cannot be address(0).");

  });


  it("DecreaseAllowance function: Should revert at the third require statement.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const value = utils.parseEther("0");

    await expect(contract.decreaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Cannot decrease allowance to zero.");

  });

  it("DecreaseAllowance function: Should revert at the fourth require statement..", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address2);

    const value = utils.parseEther("0.0001");

    await expect(connectedContract.decreaseAllowance(address1.address, address2.address, value)).to.be.revertedWith("Only the owner can decrease the allowance.");

  });


  it("Transfer function: should successfully transfer tokens.", async () => { 
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();
    const connectedContract = await contract.connect(address1);
    const tokenPrice = 0.001;
    const amount = "1";
    const value = amount * tokenPrice;

    const tx = await connectedContract.mint(
      1, 
      {
        value: utils.parseEther(value.toString()),
      }
    );
    await tx.wait();

    const value1 = utils.parseEther("1");
    const value2 = utils.parseEther("-1");
    const BN = BigNumber.from(value1);
    const BNeg = BigNumber.from(value2);

    await expect(connectedContract.transfer(address2.address, value1)).to.changeTokenBalances(
      connectedContract,
      [address1, address2],
      [BNeg, BN]
    );
  });

  it("Transfer function: Should emit a Transfer event upon transfer.", async () => {
    const deploy1 = await hre.ethers.getContractFactory("ERC20");
    const contract = await deploy1.deploy("Nate Token", "NT");
    await contract.deployed();

    const [address1, address2] = await ethers.getSigners();

    const connectedContract = await contract.connect(address1);

    const value = 0.0001;

    const mintTX = await connectedContract.mint(
      1,
      {
        value: utils.parseEther(value.toString()),
      }
    );

    const amount = utils.parseEther("0.000001")

    await expect(connectedContract.transfer(address2.address, amount)).to.emit(connectedContract, "Transfer").withArgs(
      address1.address,
      address2.address,
      amount
    );
        
  });

  it("Transfer function: Should revert at the first require statement.", async () => {

  });

  it("Transfer function: Should revert at the second require statement.", async () => {

  });










});