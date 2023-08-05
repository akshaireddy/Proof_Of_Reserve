// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    address public reserveManager;
    uint256 public reserveAmount;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);
    
    constructor() {
        reserveManager = msg.sender;
    }

    modifier onlyReserveManager() {
        require(msg.sender == reserveManager, "Only the reserve manager can perform this action.");
        _;
    }

    function deposit() external payable onlyReserveManager {
        reserveAmount += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external onlyReserveManager {
        require(reserveAmount >= amount, "Insufficient funds in the reserve.");
        reserveAmount -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function getReserveAmount() external view returns (uint256) {
        return reserveAmount;
    }
}
