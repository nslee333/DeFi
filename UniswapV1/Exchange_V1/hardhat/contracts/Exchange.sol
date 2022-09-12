// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract Exchange is ERC20 {

    address public tokenContract;

    mapping(address => uint256) private liquidityBalance;

    constructor(address _tokenContract) ERC20("LiquidityToken", "LP") {
        tokenContract = _tokenContract;
    }

    function getLiquidityBalance(address owner) public view returns (uint256) {
        return liquidityBalance[owner];
    }

    function getReserves() public view returns (uint256) {
        return ERC20(tokenContract).balanceOf(address(this));
    }

    function addLiquidity(uint256 tokenAmount, uint256 deadline) public payable returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        ERC20(tokenContract).transferFrom(msg.sender, address(this), tokenAmount);

        uint256 ethAmount = msg.value;
        uint256 liquidityAmount = ethAmount; 
        liquidityBalance[msg.sender] = liquidityAmount;

        _mint(msg.sender, liquidityAmount);
        return liquidityAmount;
    }

    function removeLiquidity(uint256 lpTokenAmount, uint256 deadline) public returns (uint256, uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        require(lpTokenAmount > 0, "Please increase the amount of liquidity you wish to burn.");

        uint256 ethAmount = lpTokenAmount;
        uint256 tokenAmount = lpTokenAmount;
        address recipient = msg.sender;

        liquidityBalance[recipient] -= lpTokenAmount;

        (bool sent,) = recipient.call{value: lpTokenAmount}("");
        require(sent, "Failed to send ether.");

        ERC20(tokenContract).transfer(recipient, lpTokenAmount);
        _burn(msg.sender, lpTokenAmount);

        return (ethAmount, tokenAmount); 
    }

    function tokenToEthSwap(uint256 tokens, uint256 deadline) public payable returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        require(tokens > 0, "Cannot swap zero tokens.");

        uint256 tokenReserves = getReserves();
        uint256 ethReserves = address(this).balance;

        uint256 invariant = tokenReserves * ethReserves;
        console.log(invariant, ethReserves, tokenReserves);

        uint256 ethSwapped = ((tokens/invariant) * 100) / 97;
        address recipient = msg.sender;
        console.log((tokens/invariant) * 100);

        (bool sent,) = recipient.call{value: ethSwapped}("");
        require(sent, "Failed to send ether.");
        return ethSwapped;
    }

    function tokenToEthSwapTransfer(uint256 tokenAmount, address recipient, uint256 deadline) public payable returns (bool success) {
        require(deadline > block.timestamp, "Deadline has passed.");
        require(tokenAmount > 0, "Cannot swap zero tokens.");
        uint256 ethReserves = address(this).balance;
        uint256 tokenReserves = getReserves();
        uint256 invariant = ethReserves * tokenReserves;
        
        uint256 ethSwapAmount = ((tokenReserves/invariant) * 100 ) / 97;
        (bool sent,) = recipient.call{value: ethSwapAmount}("");
        require(sent, "Failed to send ether.");
        return true;
    }

    function ethToTokenSwap(uint256 deadline) public payable returns (uint256) { // Token Amount requirement?
        require(deadline > block.timestamp, "Deadline has passed.");
        uint256 ethAmount = msg.value;
        address recipient = msg.sender;

        uint256 tokenReserve = getReserves();
        uint256 ethReserves = address(this).balance - msg.value;
        uint256 invariant = tokenReserve * ethReserves;

        uint256 tokenSwapAmount = ((ethAmount / invariant) * 100) / 97;

        ERC20(tokenContract).transfer(recipient, tokenSwapAmount);
        return ethAmount;
    }

    function ethToTokenSwapTransfer(address recipient, uint256 deadline) public payable returns (bool success) {
        require(deadline > block.timestamp, "Deadline has passed.");

        uint256 ethReserves = address(this).balance - msg.value;
        uint256 tokenReserve = getReserves();
        uint256 invariant = ethReserves * tokenReserve;

        uint256 tokenSwapAmount = ((ethReserves/invariant) * 100) / 97;

        ERC20(tokenContract).transfer(recipient, tokenSwapAmount);
        return true;
    }

    function currentReserves() public view returns (uint256, uint256) {
        uint256 ethReserves = address(this).balance;
        uint256 tokenReserves = getReserves();

        return (ethReserves, tokenReserves);
    }   
    
}


