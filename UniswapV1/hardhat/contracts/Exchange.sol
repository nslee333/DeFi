// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Exchange is ERC20 {

    address tokenContract;

    constructor(address _tokenContract) ERC20("LiquidityToken", "LP") {
        tokenContract = _tokenContract;
    }

    
    
    function addLiquidity(uint256 tokenAmount, uint256 deadline) public payable returns (uint256) {
        // Approve. 
        // transferFrom(tokenContract, address(this), tokenAmount);

        // Revert transaction if deadline has passed.

        


    }


    /*
   addLiquidity function.
   1. LP adds an equal amount of ERC-20 and ETH.
   2. Mints LP Tokens in exchange realitive to the tokens provided. 
   3. Deadline.


   removeLiquidity function.
   1. Burns LP tokens.
   2. Gets ERC-20 and ETH tokens returned according to the LP tokens burned.
   3. Deadline.

   tokenToEthSwap function.
   - Sell ERC-20 and get ETH returned.
   - Fee removed.

   tokenToEthSwapTransfer
   - Same as above plus sending to a receipient address.
   - Fee removed.

   ethToTokenSwap function.
    - Sell ETH and get ERC-20 tokens back.
    - Fee removed.

    ethToTokenSwapTransfer
    - Same as above plus sending to a receipient address.
    - Fee removed.


    currentLiquiditty, returns ERC-20 and ETH token reserves for display.



   







    
    */
    
    
}


