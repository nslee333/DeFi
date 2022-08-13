const { ethers } = require("Hardhat");


async function main() {
  
  const deploy1 = await ethers.getContractFactory("ERC20");

  const deployedContract = await deploy1.deploy("NateToken", "NT");

  await deployedContract.deployed();

  console.log("Contract deployed at: ", deployedContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
