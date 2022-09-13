import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Factory", function () {
    it("Should create a new exchange and return the id.", async () => {
        const CFF = await ethers.getContractFactory("Factory");
        const factory = await CFF.deploy();
        await factory.deployed();
    
        const tx1 = await factory.create("SL + ETH");
        const tx2 = await factory.create("2");
        const tx3 = await factory.create("3");
        const tx4 = await factory.create("4");

        const confirmation1 = await factory.getAddress(0);
        const confirmation2 = await factory.getAddress(1);
        const confirmation3 = await factory.getAddress(2);
        const confirmation4 = await factory.getAddress(3);
        console.log(confirmation1, confirmation2, confirmation3, confirmation4);
    });

});
