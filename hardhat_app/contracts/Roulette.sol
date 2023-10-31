// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Roulette is ERC20, ERC20Burnable {

    uint256 private randNonce;

    constructor() ERC20("Roulette", "RLT") {
    }

    event rouletteSpun(address indexed player, uint256 payout, uint8 numberRolled);

    function invest() external payable {
        require(msg.value != 0, "Can't invest 0");
        _mint(msg.sender, msg.value);
    }

    // for test purposes, I want to get my eth back
    function refund() external  {
        uint256 amount = balanceOf(msg.sender);
        require(amount!=0, "Not Invested"); //check
        _burn(msg.sender, amount);
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "error refunding");
    }

    // If I don't check, then anyone can send an array with crazy payouts and only pay 1 wei, creating an attack vector
    function spin(uint8[] memory numbers, uint256[] memory betAmounts) external payable returns(uint256 amountWon, uint8 numberRolled) {
        uint256 amountBet = getSumOfBets(betAmounts);
        require(msg.value==amountBet, "Wrong amount sent to contract!");
        require(msg.value <= address(this).balance, "Not enough invested in contract.");
        require(numbers.length==betAmounts.length, "Wrong bet-payout arrays sent");

        uint8 randNum = getPseudoRandom();

        for (uint8 i; i < numbers.length; i++){
            if ( randNum == numbers[i]) {
                uint256 payout = betAmounts[i]*36;
                (bool success, ) = payable(msg.sender).call{value: payout}("");
                require(success, "Payout error");
                emit rouletteSpun(msg.sender, payout, randNum);
                return (payout, randNum);
            }
        }

        emit rouletteSpun(msg.sender, 0, randNum);
        return (0, randNum);

    }


    function getPseudoRandom() internal returns (uint8) {
        randNonce++;
        return uint8(uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce))) % 37);
    }


    // expensive, but required in order to make sure the one sending the tx has payed the amount he has to in order for the bet to be valid.
    function getSumOfBets(uint256[] memory betAmounts) internal pure returns(uint256){
        uint256 total;
        for (uint8 i; i<betAmounts.length; i++){
            total += betAmounts[i];
        }
        return total;
    }
}