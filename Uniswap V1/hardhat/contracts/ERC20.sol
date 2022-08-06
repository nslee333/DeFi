// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ERC20 {

    string public tokenName;

    string public tokenSymbol;

    uint256 public tokenDecimals;

    uint256 public tokenSupply = 1000000;

    mapping public (address owner => uint256 balance) balances;
    
    mapping private (address _owner => mapping(address _spender => uint256 _amount)) allowances;

    



    // Mapping of owner, and balance . named balances?
    
    constructor (string _name, string _symbol, uint256 _decimals) {
        // need to initialize the name and symbol of the token.
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenDecimals = _decimals;

    };

    function name () public view returns (string) {
        return tokenName;
    };



    function symbol () public view returns (string) {
        return tokenSymbol;
    };

    function decimals () public view returns (uint256) {
        return tokenDecimals;
    };

    function totalSupply () public view returns (uint256) {
        return tokenSupply;
    };

    function balanceOf(address _owner) public view returns (uint256) {
        // Check if the address is 0x0?
        return balances(_owner);
    };

    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        require(_from != address(0), "Cannot transfer from the zero address.");
        require(_to != address(0), "Cannot transfer to the zero address.");
        require(_amount >= balanceOf(_from), "the amount exceeds the balance of the address.");

        balances[_from] = balances[_from] -= amount;
        balances[_to] = balances[_to] += amount;

        emit Transfer(_from, _to, _amount); // Fill in.

        return true;

    };


    function approve(address _owner, address _spender, uint256 _amount) public returns (bool success) {
        require(_owner == msg.sender, "Cannot approve without the owner's approval");
        require(_spender != address(0), "Cannot give approval to a zero address");

        allowances[_owner][_spender] = _amount;

        emit Approval(_owner, _spender, _amount);
    };

    function allowance(address _owner, address _spender) {
        require(_owner != address(0), "Please enter a valid account.");
        return allowances[_owner][_spender];
    };

    // Events

    event Transfer(address _from, address _to, uint256 _amount);

    event Approval (address _owner, address _spender, uint256 _amount);

    // only owner function modifier () {};

    // transfer the contract's balance from the contract to the owner.

    function mint() {};



    receive() {};

    fallback() {};



    





}
