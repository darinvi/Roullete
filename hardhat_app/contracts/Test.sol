// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract Test {

    uint256 public test;

    function increment(uint256 value) public {
        test += value;
    }    

    function decrement(uint256 value) public {
        require(value <= test, 'underflow');
        test -= value;
    }
}