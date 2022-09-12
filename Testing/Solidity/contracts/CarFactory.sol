// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract Car {
    string public model;
    address public owner;

    constructor (string memory _model, address _owner) payable {
        model = _model;
        owner = _owner;
    }
}

contract CarFactory {
    Car[] public cars;

   function create(string memory _model) public { // Creates a new contract, and assigns it to a variable.
        Car car = new Car(_model, address(this));
        cars.push(car);
   }

   function createAndSendEther(address _owner, string memory _model) public payable { // Creates a new contract, and gives it ether.
        Car car = (new Car){value: msg.value}(_model, _owner);
   }

   function carsGetter() public view returns (Car[] memory) {
        return cars;
   }
}
