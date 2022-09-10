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

        const testFactory = await ethers.getContractFactory("Test");
        const test = await testFactory.deploy();
        await test.deployed();

        const address0 = ethers.constants.AddressZero;

        const [address1, address2] = await ethers.getSigners();

        const currentTime = await time.latest();
        const futureDeadline = currentTime + 3600;
        const passedDeadline = currentTime - 3600;

        const mintAmount = 10;
        const mintAmountTotal = 10 * 0.0001;
        


        return {solari, exchange, test, address0, address1, address2, futureDeadline, passedDeadline, mintAmount, mintAmountTotal};
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
        const {exchange, solari, address1, mintAmount, mintAmountTotal, futureDeadline} = await loadFixture(fixture);

       

        const mintTx: any = await solari.mint
        (
            mintAmount,
            {
                value: utils.parseEther(mintAmountTotal.toString())
            }
        );
        await mintTx.wait();
        

        const tokenAmount: string = "10";
        const tokenApproval: string = "15"

        const approval = await solari.approve(exchange.address, utils.parseEther(tokenApproval));
        await approval.wait();


        await expect(exchange.addLiquidity(utils.parseEther(tokenAmount), futureDeadline,
        {
            value: utils.parseEther(tokenAmount),
        }
        )).to.changeEtherBalance(address1.address, BigNumber.from("-10000000000000000000"));
        
        expect(await exchange.balanceOf(address1.address)).to.equal("10000000000000000000");

        const confirmation: BigNumber = await solari.balanceOf(address1.address);

        expect(confirmation.toString()).to.equal("0");
       
    });

    it("addLiquidity(): Should revert at the deadline require statement.", async () => {
        const {exchange, passedDeadline} = await loadFixture(fixture);

        const amount: string = "10";
        
        await expect(exchange.addLiquidity(utils.parseEther(amount), passedDeadline)).to.be.revertedWith("Deadline has passed.");

    });
    
    it("removeLiquidity(): Should remove liquidity.", async () => {
        const {exchange, solari, address1, futureDeadline, mintAmount, mintAmountTotal} = await loadFixture(fixture);

       const mintTx: any = await solari.mint(
            mintAmount,
            {
                value: utils.parseEther(mintAmountTotal.toString())
            }
        );
        await mintTx.wait();

        const approvalTx = await solari.approve(exchange.address, utils.parseEther(mintAmount.toString()));
        await approvalTx.wait();

        const addTx: any = await exchange.addLiquidity(utils.parseEther(mintAmount.toString()), futureDeadline, {value: utils.parseEther(mintAmount.toString())});
        await addTx.wait();

        expect(await exchange.removeLiquidity(utils.parseEther(mintAmount.toString()), futureDeadline)).to.changeEtherBalance(address1.address, BigNumber.from(utils.parseEther("10")));

        expect(await solari.balanceOf(address1.address)).to.equal(BigNumber.from(utils.parseEther("10")));

        expect(await exchange.balanceOf(address1.address)).to.equal(0);

    });

    it("removeLiquidity(): Should revert at the deadline require expression.", async () => {
        const {exchange, passedDeadline} = await loadFixture(fixture);

        const tokens: string = "10";

        await expect(exchange.removeLiquidity(utils.parseEther(tokens), passedDeadline)).to.be.revertedWith("Deadline has passed.");
    });

    it("removeLiquidity(): Should revert at the lpTokenAmount require expression.", async () => {
        const {exchange, futureDeadline} = await loadFixture(fixture);

        const tokens: number = 0;

        await expect(exchange.removeLiquidity(tokens, futureDeadline)).to.be.revertedWith("Please increase the amount of liquidity you wish to burn.");
    });

    it("removeLiquidity(): Should revert at the sentEtherViaCall require expression.", async () => {
        // const {exchange, solari, test, futureDeadline} = await loadFixture(fixture);

        // const tokens = 10;
        // const mintAmount = tokens * 0.0001;
        // const mintTx = await solari.mint(
        //     tokens,
        //     {
        //         value: utils.parseEther(mintAmount.toString())
        //     }
        // );
        // await mintTx.wait();

        // const approveTx = await solari.approve(exchange.address, tokens);
        // await approveTx.wait();

        // const liqTx = await exchange.addLiquidity(tokens, futureDeadline);

        // const connectedDexWithTest = exchange.connect(test.address);

        // await expect(connectedDexWithTest.removeLiquidity(tokens, futureDeadline)).to.be.revertedWith("Failed to send ether.");

    });

    it("tokenToEthSwap(): Should swap ERC-20 tokens to ETH.", async () => {
        const {solari, exchange, futureDeadline, address1} = await loadFixture(fixture);

        const mintAmount = 20;
        const mintAmountTotal = 20 * 0.0001;
        const mintTx = await solari.mint(
            mintAmount, 
            {
                value: utils.parseEther(mintAmountTotal.toString())
            }
        );
        await mintTx.wait();

        const liqAmount = 10;
        const liqTotalAmount = 


        const liquidityTx = exchange.addLiquidity()






        await expect(exchange.tokenToEthSwap(mintAmount, futureDeadline)).to.changeTokenBalance(solari, address1.address, -10);

        // await expect()
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
