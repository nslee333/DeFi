// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Exchange is ERC20 {

    string public namePair;
    address public tokenContract;
    mapping(address => uint256) private liquidityBalance;

    constructor (string memory _namePair, address _tokenContract) ERC20("LiquidityToken", "LP") {
        namePair = _namePair;
        tokenContract = _tokenContract;
    }

    function getLiquidityBalance(address owner) public view returns (uint256) {
        return liquidityBalance[owner];
    }

    function getReserves() public view returns (uint256) {
        return ERC20(tokenContract).balanceOf(address(this));
    }

    function addLiquidity(uint256 tokenAmount, uint256 deadline) public payable returns (uint256) {}

    function removeLiquidity(uint256 lpTokenAmount, uin256 deadline) public returns (uint256) {}

    function tokenToEthSwap(uint256 tokenAmount, uint256 deadline) public returns (uint256) {}

    function tokenToEthSwapTransfer(uint256 tokenAmount, address recipient, uint256 deadline) public payable returns (bool success) {} 

    function ethToTokenSwap(uint256 deadline) public payable returns (uin256) {}

    function ethToTokenSwapTransfer(address recipient, uint256 deadline) public payable returns (bool success) {}

    function currentReserves() public view returns (uint256, uint256) {
        uint256 ethReserves = address(this).balance;
        uint256 tokenReserves = getReserves();
        return (ethReserves, tokenReserves);
    }

}



contract Factory {

    Exchange[] exchanges;
    uint256 public numExchanges;

    function create(string memory _namePair) public payable returns (uint256 dexID) {
        Exchange newDex = new Exchange(_namePair);
        uint256 dexID = numExchanges++;
        exchanges.push(newDex);
        return dexID;
    }

    function getAddress(uint256 dexID) public view returns (Exchange) {
        return exchanges[dexID];
    }

}
