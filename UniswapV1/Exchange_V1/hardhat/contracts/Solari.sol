// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Solari is ERC20 {

    uint256 tokenPrice = 0.0001 ether;

    constructor () ERC20("Solari", "SL") {}

    function mint(uint256 tokenAmount) public payable {
        uint256 requiredAmount = tokenAmount * tokenPrice;
        require(requiredAmount >= msg.value, "Not enough ether sent.");
        uint256 convertedMintAmount = tokenAmount * (10**18);
        _mint(msg.sender, convertedMintAmount);
    }

    receive() external payable {}

    fallback() external payable {}

}