import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  it("Should build another contract, and display the address.", async () => {
    const CFF = await ethers.getContractFactory("CarFactory");
    const factory = await CFF.deploy();
    await factory.deployed();

    const tx = await factory.create("Ford");
    await tx.wait();

    console.log(await factory.carsGetter());
  });
});
