// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract ERC20 {

    string private name;

    string private symbol;

    uint8 private decimals = 18;

    uint256 private tokenPrice = 0.0001 ether;

    uint256 private _currentTokenSupply;

    uint256 private _maxTokenSupply = 1000000 * 10**18;

    uint256 private _burnedTokens;

    mapping(address => uint256) private _balances;
    
    mapping(address => mapping(address => uint256)) private _allowances;

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

    function maxTokenSupply() public view returns (uint256) {
        return _maxTokenSupply;
    }

    function getTokenPrice() public view returns (uint256) {
        return tokenPrice;
    }


    function currentTokenSupply() public view returns (uint256) {
        return _currentTokenSupply;
    }

    function burnedTokens() public view returns (uint256) {
        return _burnedTokens;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Address 0.");
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _amount) public {
        require(_amount > 0, "Tranfer amount too small.");
        require(_balances[_msgSender()] > _amount, "You don't have enough to transfer.");
        require(_to != address(0), "Cannot transfer to address 0.");

        address owner = _msgSender();

        _transfer(owner, _to, _amount);
    }

    function allowances(address _owner, address _spender) public view returns (uint256) {
        require(_owner != address(0), "Cannot check address(0)");
        return _allowances[_owner][_spender];
    }


    function approve(address spender, uint256 amount) public {
        require(amount > 0, "Allowance amount too small.");
        
        address owner = _msgSender();

        _approve(owner, spender, amount);

        emit Approval(owner, spender, amount);
    }

    function transferFrom(address _from, address _to, uint256 _amount) public {
        require(_from != address(0), "Cannot transfer from address 0.");
        require(_to != address(0), "Cannot transfer to address 0.");
        require(_amount != 0, "Transfer amount too small.");
        require(_allowances[_from][_to] >= _amount, "Need an approval from the owner to transfer funds");
    
        _balances[_from] -= _amount;
        _balances[_to] += _amount;

        _spendAllowance(_from, _to, _amount);

        emit Transfer(_from, _to, _amount);

    }

    function increaseAllowance(address spender, uint256 amount) public {
        require(amount != 0, "Allowance amount too small.");

        address _owner = _msgSender();

        _allowances[_owner][spender] = 0;
        _approve(_owner, spender, amount);        
    }

    function decreaseAllowance(address spender, uint256 amount) public {
        address _owner = _msgSender();
        if (amount == 0) {
            _allowances[_owner][spender] = 0;
        } else {
            _allowances[_owner][spender] = 0;
            _approve(_owner, spender, amount);
        }
    }

    function _transfer(address _from, address _to, uint256 _amount) private {
        require(_to != address(0), "Cannot transfer to address 0.");

        _beforeTokenTransfer(_from, _to, _amount);

        _balances[_from] -= _amount;
        _balances[_to] += _amount;

        emit Transfer(_from, _to, _amount);

        _afterTokenTransfer(_from, _to, _amount);

    }

    function mint(uint256 amount) public payable {
        require(amount > 0, "Cannot mint zero tokens.");
        uint256 requiredAmount = tokenPrice * amount;
        require(requiredAmount >= msg.value, "Not enough Ether sent to complete minting.");
        uint256 possibleTotal = amount * 10**18;
        uint256 possibleSupply = possibleTotal += _currentTokenSupply;
        require(possibleSupply <= _maxTokenSupply, "Maximum supply circulation reached.");

        address account = _msgSender();

        _mint(account, amount);
    }

    function _mint(address account, uint256 amount) private {
        _balances[account] += amount;
        _currentTokenSupply += amount;
        
    }

    function burn(uint256 amount) public {
        require(amount > 0, "Cannot burn zero tokens");

        address account = _msgSender();
        _burn(account, amount);
    }


    function _burn(address account, uint256 amount) public {
        _balances[account] -= amount;
        _balances[address(0)] += amount;
        _burnedTokens += amount;



        emit Burn(account, amount);

    }

    function _approve(address _owner, address _spender, uint256 _amount) private {
        require(_spender != address(0), "Cannot give approval to address 0.");

        _allowances[_owner][_spender] = _amount;

        emit Approval(_owner, _spender, _amount);             

    }

    function _spendAllowance(address _owner, address _spender, uint256 _amount) private {
        _allowances[_owner][_spender] -= _amount;
    }

  
    function _beforeTokenTransfer(address _from, address _to, uint256 _amount) private {}

    function _afterTokenTransfer(address _from, address _to, uint256 _amount) private {}

    function _msgSender() private view returns (address) {
        return msg.sender;
    }

    function msgSender() public view returns (address) {
        return _msgSender();
    }

    event Transfer(address from, address to, uint256 value);

    event Approval(address from, address to, uint256 value);

    event Burn(address account, uint256 value);

}
