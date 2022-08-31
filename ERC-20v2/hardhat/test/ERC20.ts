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

    

    it("Name(): Should return the name of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.getName();
        expect(tx).to.equal("Solari");
    });

    it("Symbol(): Should return the symbol of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getSymbol();
        expect(tx).to.equal("SL");
    });

    it("decimals(): Should return the decimals of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getDecimals();
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

        expect(tx.toString()).to.equal(expectedValue.toLocaleString("en-US", {useGrouping: false}));
    }); 

    it("balanceOf(): Should return the balance of the account.", async () => {
        const {contract} = await loadFixture(fixture);

        const value = 5 * 0.0001;
        const mintTx = await contract.mint
        (
            5, 
            {
                value: utils.parseEther(value.toString()),
            }
        );
        await mintTx.wait();

        const [signer] = await ethers.getSigners();

        const tx = await contract.balanceOf(signer.address);
        expect(tx).to.equal(5);
    });

    

   it("Transfer(): Should transfer an amount from one account to another.", async () => {
    const {contract} = await loadFixture(fixture);

    const [address1, address2] = await ethers.getSigners();
    const value = 5 * 0.0001;

    const connectedContract = contract.connect(address1);

    const msg = await contract.msgSender();


    const mintTx = await connectedContract.mint
    (
        5,
        {
            value: utils.parseEther(value.toString()),
        }
    );
    await mintTx.wait();

    const tx = await contract.balanceOf(address1.address);
    console.log(tx);

    const amount = utils.parseEther("0.00001");
    console.log(tx, utils.parseEther("0.0001"), utils.parseEther(value.toString()));

    await expect(connectedContract.transfer(address2.address, amount)).to.changeTokenBalances(
        connectedContract,
        [address1, address2],
        [-amount, amount]
    ); 
    

   });

   
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
