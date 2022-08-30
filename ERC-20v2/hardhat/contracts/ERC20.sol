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
        require(_owner != address(0), "Address 0.");
        return balances[_owner];
    }

    function transfer(address _to, uint256 _amount) public {
        require(_amount > 0, "Tranfer amount too small.");
        require(balances[_msgSender()] > _amount, "You don't have enough to transfer.");
        require(_to != address(0), "Cannot transfer to address 0.");

        address owner = _msgSender();

        _transfer(owner, _to, _amount);
    }

    // allowance(owner, spender)

    

    function approve(address spender, uint256 amount) public {
        require(spender != address(0), "Cannot give approval to address 0.");
        require(amount > 0, "Allowance amount too small.");
        
        address owner = _msgSender();

        _approve(owner, spender, amount);

        emit Approval(owner, spender, amount);

    }

    // TransferFrom(from, to, amount).

    // increaseAllowance(spender, added value)

    // decreaseAllowance(spender, subtractedValue)

    function _transfer(address _from, address _to, uint256 _amount) private {
        require(_to != address(0), "Cannot transfer to address 0.");

        _beforeTokenTransfer(_from, _to, _amount);

        balances[_from] -= _amount;
        balances[_to] += _amount;

        emit Transfer(_from, _to, _amount);

        _afterTokenTransfer(_from, _to, _amount);

    }

    // _mint(account, amount)

    // _burn(account, amount)

    function _approve(address _owner, address _spender, uint256 _amount) private {
        


    }
    // _approve(owner, spender, amount)

    // _spendALlowance(owner, spender, amount)

  
    function _beforeTokenTransfer(address _from, address _to, uint256 _amount) private {}

    function _afterTokenTransfer(address _from, address _to, uint256 _amount) private {}

    function _msgSender() private view returns (address) {
        return msg.sender;
    }

    // EVENTS: 

    // Transfer(from, to, value)

    event Transfer(address from, address to, uint256 value);

    event Approval(address from, address to, uint256 value);

}
