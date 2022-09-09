// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Exchange is ERC20 {

    address tokenContract;
    address LPTokenContract;

    mapping(address => uint256) private liquidityBalance;

    constructor(address _tokenContract) ERC20("LiquidityToken", "LP") {
        tokenContract = _tokenContract;
    }

    function getLiquidityBalance(address owner) public returns (uint256) {
        return liquidityBalance[owner];
    }

    function getReserves() public returns (uint256) {
        return ERC20(tokenContract).balanceOf(address(this));
    }

    function addLiquidity(uint256 tokenAmount, uint256 deadline) public payable returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        uint256 maxAllowance = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
        ERC20(tokenContract).approve(address(this), maxAllowance);
        ERC20(tokenContract).transferFrom(msg.sender, address(this), tokenAmount);

        uint256 ethAmount = msg.value;
        uint256 liquidityAmount = ethAmount; // Just minting the Invariable's amount of LP tokens to the LP.
        liquidityBalance[msg.sender] = liquidityAmount;

        _mint(msg.sender, liquidityAmount);
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

        return (ethAmount, tokenAmount); 
    }

    function tokenToEthSwap(uint256 tokens, uint256 deadline) public returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed.");
        require(tokens > 0, "Cannot swap zero tokens");

        uint256 tokenReserves = getReserves();
        uint256 ethReserves = address(this).balance;

        uint256 invariant = tokenReserves * ethReserves;

        uint256 ethSwapped = ((tokens/invariant) * 100) / 97;
        address recipient = msg.sender;

        (bool sent,) = recipient.call{value: ethSwapped}("");
        require(sent, "Failed to send ether.");
        return ethSwapped;
    }

    function tokenToEthSwap(uint256 deadline) public returns (uint256) {
        require(deadline > block.timestamp, "Deadline has passed");
        
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


