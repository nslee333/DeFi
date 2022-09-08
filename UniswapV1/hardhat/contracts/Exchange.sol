// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Exchange is ERC20 {

    address tokenContract;
    address LPTokenContract;

    constructor(address _tokenContract) ERC20("LiquidityToken", "LP") {
        tokenContract = _tokenContract;
        LPTokenContract = ERC20(LiquidityToken);
    }

    function addLiquidity(uint256 tokenAmount, uint256 deadline) public payable returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        uint256 maxAllowance = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
        ERC20(tokenContract).approve(address(this), maxAllowance);
        ERC20(tokenContract).transferFrom(msg.sender, address(this), tokenAmount);

        uint256 ethAmount = msg.value;
        uint256 ERC20TokenAmount = tokenAmount;
        uint256 liquidityAmount = ethAmount * ERC20TokenAmount; // Just minting the Invariable's amount of LP tokens to the LP.

        _mint(msg.sender, liquidityAmount);
    }

    function removeLiquidity(uint256 lpTokenAmount, uint256 deadline) public returns (uint256, uin256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        
    }


    /*
   


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


