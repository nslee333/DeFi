// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ERC20 {

    string public tokenName;

    string public tokenSymbol;

    uint256 public tokenDecimals = 18;

    uint256 public tokenSupply = 1000000 * 10**18; // 1 Million.

    uint256 public totalTokenSupply = 1000000 * 10**18; 

    uint256 public tokenPrice = 0.000001 ether;

    mapping(address owner => uint256 balance) public balances;
    
    mapping(address _owner => mapping(address _spender => uint256 _amount)) private allowances;

    address private _contractOwner; 

    constructor(string _name, string _symbol) {
        // need to initialize the name and symbol of the token.
        tokenName = _name;
        tokenSymbol = _symbol;
        _contractOwner = msg.sender();

    };

    function name() public view returns (string) {
        return tokenName;
    };



    function symbol() public view returns (string) {
        return tokenSymbol;
    };

    function decimals() public view returns (uint256) {
        return tokenDecimals;
    };

    function totalSupply() public view returns (uint256) {
        return totalTokenSupply;
    };

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    };


    function transfer(address _to, uint256 _amount) public  {
        require(_to != address(0), "Cannot transfer to the zero address");
        require(_amount > 0, "Cannot transfer zero tokens");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

        emit Transfer(msg.sender, _to, _amount);
    };

    function allowance(address _owner, address _spender) public view returns (uint256) {
        require(_owner != address(0), "Please enter a valid owner account.");
        require(_spender != address(0), "Please enter a valid spender address");
        return allowances[_owner][_spender];
    };

    function approve(address _owner, address _spender, uint256 _amount) public returns (bool success) {
        require(_owner == msg.sender, "Cannot approve without the owner's confirmation");
        require(_spender != address(0), "Cannot give approval to a zero address");

        allowances[_owner][_spender] = _amount;

        emit Approval(_owner, _spender, _amount);
    };



    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        require(allowance(_from, msg.sender) > 0, "You do not an allowance approved");
        require(_from != address(0), "Cannot transfer from the zero address.");
        require(_to != address(0), "Cannot transfer to the zero address.");
        require(_amount >= balanceOf(_from), "The amount exceeds the balance of the sender's address.");


        balances[_from] = balances[_from] -= _amount;
        balances[_to] = balances[_to] += _amount;

        emit Transfer(_from, _to, _amount); // Fill in.

        return true;

    };



    function increaseAllowance(address _owner, address _spender, uint256 _newValue) public returns (bool success) {
        require(_owner != address(0), "Cannot withdraw funds from address(0)");
        require(_spender != address(0), "Spender cannot be address(0)");
        require(_newValue > 0, "Cannot increase allowance to zero");
        require(_owner == msg.sender, "Only the owner can increase the allowance");
        
        allowances[_owner][_spender] = 0;
        allowances[_owner][_spender] = _newValue;

        return true;
    };

    function decreaseAllowance(address _owner, address _spender, uint256 _newValue) public returns (bool success) {
        require(_owner != address(0), "Cannot withdraw funds from address(0)");
        require(_spender != address(0), "Spender cannot be address(0)");
        require(_newValue > 0, "Cannot decrease allowance to zero");
        require(_owner == msg.sender, "Only the owner can decrease the allowance");

        allowances[_owner][_spender] = 0;
        allowances[_owner][_spender] = _newValue;

        return true;

    };

    function mint() public payable {
        require(tokenSupply > 0, "Not enough supply");
        require(msg.value > tokenPrice, "Not enough ether sent");
        
        uint256 mintAmount = totalSupply / msg.value;

        require(mintAmount < tokenSupply, "Not enough Token Supply");

        totalSupply -= mintAmount;
        balances[msg.sender] = mintAmount;

    };




    modifier onlyOwner() {
        require(msg.sender == _contractOwner, "Not the owner");
        _;
    };

    function etherTransfer(address _to) public onlyOwner {
        (bool sent, bytes memory data) = _to.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    } 




    event Transfer(address _from, address _to, uint256 _amount);

    event Approval(address _owner, address _spender, uint256 _amount);

    receive() external payable {};

    fallback() external payable {};


}
