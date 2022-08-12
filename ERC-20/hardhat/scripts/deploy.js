import { getContractFactory } from 'ethers';

async function main() {
  

  const deploy1 = await getContractFactory("ERC20");

  const deployedContract = await deploy1.deploy("NateToken", "NT");

  await deployedContract.deployed();

  console.log("Contract deployed at: ", deployedContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});