// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract ERC20 {

    // State variables and mappings.

    string public name;

    string public symbol;

    uint8 public decimals = 18;

    uint256 public _tokenSupply = 1000000 * 10**18;

    mapping(address => uint256) private balances;



    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getDecimals() public view returns (uint8) {
        return decimals;
    }

    function tokenSupply() public view returns (uint256) {
        return _tokenSupply;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Address 0");
        return balances[_owner];
    }

    function transfer(address _to, uint256 amount) public {
        // 

        // Assign msg.sender === owner.

        


    }

    // allowance(owner, spender)

    // approve(spender, amount)

    // TransferFrom(from, to, amount).

    // increaseAllowance(spender, added value)

    // decreaseAllowance(spender, subtractedValue)

    // _transfer(from, to, amount)

    // _mint(account, amount)

    // _burn(account, amount)

    // _approve(owner, spender, amount)

    // _spendALlowance(owner, spender, amount)

    // _beforeTokenTransfer(from, to, amount)

    // _afterTokenTransfer(from, to, amount)

    function _msgSender() private returns (address) {
        // 
    }

    // EVENTS: 

    // Transfer(from, to, value)

    // Approval(owner, spender, value)

}
