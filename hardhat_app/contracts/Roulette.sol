// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error Roulette_notInvested();
error Roulette_couldntRefund();
error Roulette_wrongAmountSent();
error Roulette_notEnoughBalanceInContract();
error Roulette_wrongArraysSent();
error Roulette_payoutError();

contract Roulette is ERC20, ERC20Burnable {

    uint256 private randNonce;

    constructor() ERC20("Roulette", "RLT") {
    }

    event rouletteSpun(address indexed player, uint256 payout, uint8 numberRolled);
    event rouletteInvestmentReceived(address indexed investor, uint256 amount);
    event investmentRefunded(address indexed investor, uint256 amount);

    function invest() external payable {
        require(msg.value != 0, "Can't invest 0");
        _mint(msg.sender, msg.value);
        emit rouletteInvestmentReceived(msg.sender, msg.value);
    }

    // for test purposes, I want to get my eth back
    function refund() external  {
        uint256 _amount = balanceOf(msg.sender);
        if(_amount==0) revert Roulette_notInvested(); //check
        _burn(msg.sender, _amount); //effect
        (bool success, ) = payable(msg.sender).call{value: _amount}(""); //interaction
        if(!success) revert Roulette_couldntRefund();
        emit investmentRefunded(msg.sender, _amount);
    }

    // If I don't check, then anyone can send an array with crazy payouts and only pay 1 wei, creating an attack vector
    function spin(
        uint8[] memory _numbers, 
        uint256[] memory _betAmounts
    ) 
    external 
    payable 
    returns(
        uint256 amountWon, 
        uint8 numberRolled
    ) 
    {
        uint256 amountBet = getSumOfBets(_betAmounts);
        if(msg.value != amountBet) revert Roulette_wrongAmountSent();
        if(msg.value > address(this).balance) revert Roulette_notEnoughBalanceInContract();
        if(_numbers.length != _betAmounts.length) revert Roulette_wrongArraysSent();

        uint8 randNum = getPseudoRandom();

        for (uint8 i; i < _numbers.length; i++){
            if ( randNum == _numbers[i]) {
                uint256 payout = _betAmounts[i]*36;
                (bool success, ) = payable(msg.sender).call{value: payout}("");
                if (!success) revert Roulette_payoutError();
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