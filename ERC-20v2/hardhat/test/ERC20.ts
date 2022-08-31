import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";

describe("ERC-20v2", async () => {

    async function fixture() {
        const contractFactory = await ethers.getContractFactory("ERC20");
        const contract = await contractFactory.deploy("Solari", "SL");
        await contract.deployed();

        return {contract};
    }

    

    // it("Name(): Should return the name of the token contract.", async () => {
    //     const {contract} = await loadFixture(fixture);
    //     const tx = await contract.getName();
    //     expect(tx).to.equal("Solari");
    // });

    it("Symbol(): Should return the symbol of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getSymbol();
        expect(tx).to.equal("SL");
    });

    it("decimals(): Should return the decimals of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.decimals();
        expect(tx).to.equal(18);
    });

    // totalSupply()
    it("currentTokenSupply(): Should return the current minted token supply.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.currentTokenSupply();
        expect(tx).to.equal(0);
    });

    it("maxTokenSupply(): Should return the maxTokenSupply of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.maxTokenSupply();
        const expectedValue = 1000000 * (10 ** 18);
        console.log(expectedValue.toLocaleString());
        expect(tx.toString()).to.equal(expectedValue.toString());
        
    }); 

    // balanceOf(account)

    // Transfer(to, amount)

    // allowance(owner, spender)

    // approve(spender, amount)

    // TransferFrom(from, to, amount).

    // increaseAllowance(spender, added value)

    // decreaseAllowance(spender, subtractedValue)

    // _transfer(from, to, amount)

    // mint

    // _mint(account, amount)

    // burn

    // _burn(account, amount)

    // _approve(owner, spender, amount)

    // _spendALlowance(owner, spender, amount)

    // _beforeTokenTransfer(from, to, amount)

    // _afterTokenTransfer(from, to, amount)

    // events:

    // Transfer(from, to, value)

    // Approval(owner, spender, value)
});
