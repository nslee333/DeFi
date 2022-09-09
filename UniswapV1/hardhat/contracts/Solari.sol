// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Solari is ERC20 {

    address private owner;
    
    constructor () ERC20("Solari", "SL") {
        owner = msg.sender;
    }
}