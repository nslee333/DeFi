import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { utils, BigNumber } from "ethers";

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
        const {exchange, solari, address1} = await loadFixture(fixture);

        const mintAmount: number = 10 * 0.0001;

        const mintTx: any = await solari.mint
        (
            10,
            {
                value: utils.parseEther(mintAmount.toString())
            }
        );
        await mintTx.wait();
        

        const tokenAmount: string = "10";
        const tokenApproval: string = "15"

        const approval = await solari.approve(exchange.address, utils.parseEther(tokenApproval));
        await approval.wait();



        const timeNow: number = await time.latest();
        const timeDeadline: number = timeNow + 3600;

        await expect(exchange.addLiquidity(utils.parseEther(tokenAmount), timeDeadline,
        {
            value: utils.parseEther(tokenAmount),
        }
        )).to.changeEtherBalance(address1.address, BigNumber.from("-10000000000000000000"));
        
        expect(await exchange.balanceOf(address1.address)).to.equal("10000000000000000000");

        const confirmation: BigNumber = await solari.balanceOf(address1.address);

        expect(confirmation.toString()).to.equal("0");
       
    });

    it("addLiquidity(): Should revert at the deadline require statement.", async () => {
        const {exchange} = await loadFixture(fixture);

        const amount: string = "10";
        const currentTime: number = await time.latest();
        const deadline: number = currentTime - 3600;

        await expect(exchange.addLiquidity(utils.parseEther(amount), deadline)).to.be.revertedWith("Deadline has passed.");

    });
    
    it("removeLiquidity(): Should remove liquidity.", async () => {
        const {exchange, solari, address1} = await loadFixture(fixture);

        const value: number = 10 * 0.0001;
        const tokens = 10;

        const mintTx: any = await solari.mint(
            tokens,
            {
                value: utils.parseEther(value.toString())
            }
        );
        await mintTx.wait();

        const approvalTx = await solari.approve(exchange.address, utils.parseEther(tokens.toString()));
        await approvalTx.wait();

        const timeNow = await time.latest();
        const deadline = timeNow + 3600;


        const addTx: any = await exchange.addLiquidity(utils.parseEther(tokens.toString()), deadline, {value: utils.parseEther(tokens.toString())});
        await addTx.wait();

        expect(await exchange.removeLiquidity(utils.parseEther(tokens.toString()), deadline)).to.changeEtherBalance(address1.address, BigNumber.from(utils.parseEther("10")));

        expect(await solari.balanceOf(address1.address)).to.equal(BigNumber.from(utils.parseEther("10")));

        expect(await exchange.balanceOf(address1.address)).to.equal(0);

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
