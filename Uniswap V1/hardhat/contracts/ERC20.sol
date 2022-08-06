// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ERC20 {

    string public tokenName;

    string public tokenSymbol;

    uint256 public tokenDecimals;

    uint256 public tokenSupply = 1000000;

    mapping public (address owner => uint256 balance) balances;



    // Mapping of owner, and balance . named balances?
    
    constructor (string _name, string _symbol, uint256 _decimals) {
        // need to initialize the name and symbol of the token.
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenDecimals = _decimals;

    };

    name () public view returns (string) {
        return tokenName;
    };



    symbol () public view returns (string) {
        return tokenSymbol;
    };

    decimals () public view returns (uint256) {
        return tokenDecimals;
    };

    totalSupply () public view returns (uint256) {
        return tokenSupply;
    };

    balanceOf(address _owner) public view returns (uint256) {
        // Check if the address is 0x0?
        return balances(_owner);
    };

    transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        require(_from != 0x0, "Cannot transfer from the zero address.");
        require(_to != 0x0, "Cannot transfer to the zero address.");
        require(_amount >= balanceOf(_from), "the amount exceeds the balance of the address.");

        balances(_from) = balances(_from) -= amount;
        balances(_to) = balances(_to) += amount;

        emit Transfer; // Fill in.

        return true;

    };


    approve(address _owner, address _spender, uint256 _amount) public returns (bool success) {

    };

    allowance() {};

    // Events

    Transfer() {};

    Approval () {};

    // only owner function modifier () {};

    // transfer the contract's balance from the contract to the owner.

    mint() {};



    receive() {};

    fallback() {};



    





}
