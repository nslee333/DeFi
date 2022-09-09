import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Exchange", function () {

    const fixture = async () => {
        const solariFactory = await ethers.getContractFactory("Solari");
        const solari = await solariFactory.deploy();
        await solari.deployed();
        
        const exchangeFactory = await ethers.getContractFactory("Exchange");
        const exchange = await exchangeFactory.deploy(solari.address);
        await exchange.deployed();

        const address0 = ethers.constants.AddressZero;

        const [address1, address2] = await ethers.getSigners();


        return {solari, exchange, address0, address1, address2};
    }

    it("getLiquidityBalance(): Should return a balance of an address.", async () => {
        const {exchange, address1} = await loadFixture(fixture);

        const tx = await exchange.getLiquidityBalance(address1.address);

        expect(tx.toString()).to.equal("0");
    });

    it("getReserves(): Should return the Exchange's ERC-20 balance.", async () => {
        const {exchange} = await loadFixture(fixture);
        const tx = await exchange.getReserves();

        expect(tx.toString()).to.equal("0");
    });

    it("addLiquidity(): Should successfully add liquidity.", async () => {
        const {exchange, solari} = await loadFixture(fixture);

        const mintTx = await solari.mint()
        // Mint solari to address1.

        // Then take an equal amount of solari and eth and addLiquidity.

        // expect balance of address1 LP tokens to equal amount of eth passed in.


    });

    it("addLiquidity(): Should revert at the deadline require statement.", async () => {

    });
    
    it("removeLiquidity(): Should remove liquidity.", async () => {

    });

    it("removeLiquidity(): Should revert at the deadline require expression.", async () => {

    });

    it("removeLiquidity(): Should revert at the lpTokenAmount require expression.", async () => {

    });

    it("removeLiquidity(): Should revert at the sentEtherViaCall require expression.", async () => {

    });

    it("tokenToEthSwap(): Should swap ERC-20 tokens to ETH.", async () => {

    });

    it("tokenToEthSwap(): Should revert at the deadline require expression.", async () => {

    });

    it("tokenToEthSwap(): Should revert at the tokens require expression.", async () => {

    });

    it("tokenToEthSwap(): Should revert at the sendEtherViaCall require expression.", async () => {

    });

    it("tokenToEthSwapTransfer(): Should swap tokens and send to recipient address.", async () => {

    });

    it("tokenToEthSwapTransfer(): Should revert at the deadline require expression.", async () => {

    });

    it("tokenToEthSwapTransfer(): Should revert at the tokenAmount require expression.", async () => {
        
    });

    it("tokenToEthSwapTransfer(): Should revert at the sendEtherViaCall require expression.", async () => {

    });

    it("ethToTokenSwap(): Should swap ETH to ERC-20 tokens.", async () => {

    });

    it("ethToTokenSwap(): Should revert at the deadline require expression.", async () => {

    });

    it("ethToTokenSwapTransfer(): Should swap ETH to ERC-20 tokens to a recipient address.", async () => {
        
    });

    it("ethToTokenSwapTransfer(): Should revert at the deadline require expression.", async () => {
        
    })

    it("currentReserves(): Should return the reserves of ETH and ERC-20.", async () => {

    });

});
