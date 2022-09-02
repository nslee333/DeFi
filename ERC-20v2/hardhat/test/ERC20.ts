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

    it("getName(): Should return the name of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.getName();
        expect(tx).to.equal("Solari");
    });

    it("getSymbol(): Should return the symbol of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getSymbol();
        expect(tx).to.equal("SL");
    });

    it("getDecimals(): Should return the decimals of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getDecimals();
        expect(tx).to.equal(18);
    });


    it("maxTokenSupply(): Should return the maxTokenSupply of the token contract.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.maxTokenSupply();

        const expectedValue = 10 * (10 ** 18);

        expect(tx.toString()).to.equal(expectedValue.toLocaleString("en-US", {useGrouping: false}));
    }); 

    it("getTokenPrice(): Should return the current token price.", async () => {
        const {contract} = await loadFixture(fixture);

        const tokenPrice = 0.0001 * (10**18)

        const tx = await contract.getTokenPrice();
        expect(tx.toString()).to.equal(tokenPrice.toString());
    });

    it("currentTokenSupply(): Should return the current minted token supply.", async () => {
        const {contract} = await loadFixture(fixture);
        const tx = await contract.currentTokenSupply();
        expect(tx).to.equal(0);
    });

    it("BurnedTokens(): Should return the current amount of burned tokens.", async () => {
        const {contract} = await loadFixture(fixture);

        const tx = await contract.getBurnedTokens();
        expect(tx.toString()).to.equal("0");
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

    it("BalanceOf(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);
        const address0 = ethers.constants.AddressZero;
        await expect(contract.balanceOf(address0)).to.be.revertedWith("Address 0.");
    });

    

    it("Transfer(): Should transfer an amount from one account to another.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();
        const value = 5 * 0.0001;

        const connectedContract = contract.connect(address1);

        const mintTx = await connectedContract.mint
        (
            5,
            {
                value: utils.parseEther(value.toString()),
            }
        );
        await mintTx.wait();

        const amount = 1;

        await expect(connectedContract.transfer(address2.address, amount)).to.changeTokenBalances(
            connectedContract,
            [address1, address2],
            [-amount, amount]
        ); 
    });

    it("Transfer(): Should transfer an amount from one account to another and emit an event.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const connContract = contract.connect(address1);

        const amount = 5 * 0.0001;

        const mintTx = await connContract.mint
        (
            5, 
            {
                value: utils.parseEther(amount.toString()),
            }
        );
        await mintTx.wait();

        await expect(connContract.transfer(address2.address, 1)).to.emit(connContract, "Transfer").withArgs(address1.address, address2.address, 1);
    });

    it("Transfer(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        await expect(contract.transfer(address2.address, 0)).to.be.revertedWith("Transfer amount too small.");

    });

    it("Transfer(): Should revert at the second require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();
        
        const amount = 5;

        await expect(contract.transfer(address2.address, amount)).to.be.revertedWith("You don't have enough to transfer.");
    });

    it("Transfer(): Should revert at the third require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1] = await ethers.getSigners();

        const connContract = contract.connect(address1);

        const value = 2 * 0.0001;

        const tx = await connContract.mint
        (
            2, 
            {
                value: utils.parseEther(value.toString()),
            }
        );

        await tx.wait();

        const address0 = ethers.constants.AddressZero;

        const amount = 1;

        await expect(connContract.transfer(address0, amount)).to.be.revertedWith("Cannot transfer to address 0.");
    });

    it("Allowance(): Should display the allowance.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const connContract = contract.connect(address1);

        const amount = utils.parseEther((5 * 0.0001).toString());

        const approveTx = await connContract.approve(address2.address, amount);
        await approveTx.wait();

        const tx = await connContract.allowances(address1.address, address2.address);

        expect(tx).to.equal(amount);

    });

    it("Allowance(): Should revert at the first require statement." , async () => {
        const {contract} = await loadFixture(fixture);
        const address0 = ethers.constants.AddressZero;
        const [address1] = await ethers.getSigners();
        const value = utils.parseEther((0.0001).toString());

        await expect(contract.allowances(address0, address1.address)).to.be.revertedWith("Cannot check address(0)");
        
    });

    it("Approve(): Should approve the allowance.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = utils.parseEther((5 * 0.0001).toString());

        const tx = await contract.approve(address2.address, amount);
        await tx.wait();

        const confirm = await contract.allowances(address1.address, address2.address);

        expect(confirm).to.equal(amount);

    });

    it("Approve(): Should approve the allowance and emit the Approval event.", async () => {
        const {contract} = await loadFixture(fixture);
        const [address1, address2] = await ethers.getSigners();

        const amount = utils.parseEther((5 * 0.0001).toString());
        
        expect(await contract.approve(address2.address, amount)).to.emit(contract, "Approval").withArgs(address1.address, address2.address, amount);
    });

    it("Approve(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 0;

        await expect(contract.approve(address2.address, amount)).to.be.revertedWith("Allowance amount too small.");
    })

    it("TransferFrom(): It should transfer from one account to another.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const addr1Contract = contract.connect(address1);

        const amount = 5 * 0.0001;

        const mintTx = await addr1Contract.mint
        (
            5,
            {
                value: utils.parseEther(amount.toString()),
            }
        );
        await mintTx.wait();

        const allowanceAmnt = 3; 

        const approvalTx = await addr1Contract.approve(address2.address, allowanceAmnt);
        await approvalTx.wait();

        const addr2Contract = contract.connect(address2);

        await expect(addr2Contract.transferFrom(address1.address, address2.address, allowanceAmnt)).to.changeTokenBalances(
            addr2Contract,
            [address1.address, address2.address],
            [-allowanceAmnt, allowanceAmnt],
            );
        
    });


    it("TransferFrom(): Should transfer tokens then emit a Transfer event.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const addr1Contract = contract.connect(address1);

        const amount = 5 * 0.0001;
        const mintTx = await addr1Contract.mint
        (
            5,
            {
                value: utils.parseEther(amount.toString()),
            }
        );
        await mintTx.wait();

        const approvalAmnt = 2;
        const approvalTx = await addr1Contract.approve(address2.address, approvalAmnt);
        await approvalTx.wait();

        const addr2Contract = contract.connect(address2);

        await expect(addr2Contract.transferFrom(address1.address, address2.address, approvalAmnt)).to.emit(addr2Contract, "Transfer").withArgs(
            address1.address, 
            address2.address,
            approvalAmnt
            );
    });

    it("TransferFrom(): Should transfer tokens and call the spendAllowance function.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const addr1Contract = contract.connect(address1);
        const amount = 5;
        const value = amount * 0.0001;

        const mintTx = await addr1Contract.mint
        (
            amount,
            {
                value: utils.parseEther(value.toString()),
            }
        );
        await mintTx.wait();
        const approvalAmnt = 3;

        const approvalTx = await addr1Contract.approve(address2.address, approvalAmnt);
        await approvalTx.wait();

        const addr2Contract = contract.connect(address2);

        const transferFromTx = await addr2Contract.transferFrom(address1.address, address2.address, approvalAmnt);
        await transferFromTx.wait();

        const confirmation = await addr2Contract.allowances(address1.address, address2.address);
        expect(confirmation.toString()).to.equal("0");
    })

    it("TransferFrom(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1] = await ethers.getSigners();

        const address0 = ethers.constants.AddressZero;

        const amount = 2;

        await expect(contract.transferFrom(address0, address1.address, amount)).to.be.revertedWith("Cannot transfer from address(0).");
    });

    it("TransferFrom(): Should revert at the second require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const address0 = ethers.constants.AddressZero;

        const amount = 2;

        await expect(contract.transferFrom(address1.address, address0, amount)).to.be.revertedWith("Cannot transfer to address(0).");
    });

    it("TransferFrom(): Should revert at the third require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 0;

        await expect(contract.transferFrom(address1.address, address2.address, amount)).to.be.revertedWith("Transfer amount too small.");
    });

    it("TransferFrom(): Should revert at the fourth require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();
        
        const amount = 5;

        await expect(contract.transferFrom(address1.address, address2.address, amount)).to.be.revertedWith("Need an approval from the owner to transfer funds.");
    });

    it("IncreaseAllowance(): Should increase the allowance.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 5;
        
        const tx = await contract.increaseAllowance(address2.address, amount);

        const confirmation = await contract.allowances(address1.address, address2.address);
        expect(confirmation.toString()).to.equal(amount.toString());
    });

    it("IncreaseAllowance(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 0;

        await expect(contract.increaseAllowance(address2.address, amount)).to.be.revertedWith("Allowance amount too small.");
    });

    it("DecreaseAllowance(): Should decrease the allowance to zero.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 0;

        const tx = await contract.decreaseAllowance(address2.address, amount);
        await tx.wait();

        const confirmation = await contract.allowances(address1.address, address2.address);

        expect(confirmation.toString()).to.be.equal(amount.toString());
    });

    it("DecreaseAllowance(): Should decrease the allowance to lower number.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1, address2] = await ethers.getSigners();

        const amount = 3;

        const tx = await contract.decreaseAllowance(address2.address, amount);
        await tx.wait();

        const confirmation = await contract.allowances(address1.address, address2.address);
        expect(confirmation.toString()).to.equal(amount.toString());
    });

    // _transfer(from, to, amount)
    it("Mint(): Should mint tokens.", async () => {
        const {contract} = await loadFixture(fixture);

        const [address1] = await ethers.getSigners();

        const amount = 5 * 0.0001;

        await expect(contract.mint
        (
            5, 
            {
                value: utils.parseEther(amount.toString()),
            }
        )).to.changeTokenBalance(
            contract,
            address1.address,
            5
        );
    });

    it("Mint(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const amount = 0;

        await expect(contract.mint
            (
                amount,
                {
                    value: utils.parseEther(amount.toString()),
                }
            )).to.be.revertedWith("Cannot mint zero tokens.");
    });

    it("Mint(): Should revert at the second require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const amount = 5;
        
        const value = 1 * 0.0001;

        await expect(contract.mint
            (
                amount,
                {
                    value: utils.parseEther(value.toString())
                }
            )).to.be.revertedWith("Not enough Ether sent to complete minting.");
    });

    it("Mint(): Should revert at the third require statement.", async () => {
        const {contract} = await loadFixture(fixture);

        const amount = 11;
        const value = 11 * 0.0001;

        await expect(contract.mint(
            amount, 
            {
                value: utils.parseEther(value.toString()),
            }
        )).to.be.revertedWith("Maximum supply circulation reached.");
    });

    it("Burn(): Should burn tokens from an account.", async () => {
        const {contract} = await loadFixture(fixture);

        const value = 5 * 0.0001;

        const mintTx = await contract.mint
        (
            5, 
            {
                value: utils.parseEther(value.toString()),
            }
        );

        const amount = 5;
        const [address1] = await ethers.getSigners();

        const burnTx = await contract.burn(amount);
        await burnTx.wait();

        const confirmation = await contract.balanceOf(address1.address);

        expect(confirmation.toString()).to.equal("0");

    });

    it("Burn(): Should burn tokens and emit a Burn event.", async () => {
        const {contract} = await loadFixture(fixture);
        const amount = 5;
        const value = amount * 0.0001;

        const [address1] = await ethers.getSigners();
        
        const mintTx = await contract.mint
        (
            amount,
            {
                value: utils.parseEther(value.toString()),
            }
        );
        await mintTx.wait();

        await expect(contract.burn(amount)).to.emit(contract, "Burn").withArgs(address1.address, amount);

    }); 

    it("Burn(): Should revert at the first require statement.", async () => {
        const {contract} = await loadFixture(fixture);
        const amount = 0;

        await expect(contract.burn(amount)).to.be.revertedWith("Cannot burn zero tokens.")
    });
});
