// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Exchange {

    string public namePair;
    // address public tokenContract;

    constructor (string memory _namePair) {
        namePair = _namePair;
        // tokenContract = _tokenContract;
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
