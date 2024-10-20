// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fundraiser {
    address public creator;
    string public name;
    string public description;
    uint public goal;
    uint public deadline;
    uint public totalDonations;
    bool public goalReached;

    mapping(address => uint) public donations;

    constructor(
        string memory _name,
        string memory _description,
        uint _goal,
        uint _deadline
    ) {
        creator = msg.sender;
        name = _name;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + _deadline;
        totalDonations = 0;
        goalReached = false;
    }

    function donate() public payable {
        require(block.timestamp < deadline, "Fundraiser has ended.");
        require(!goalReached, "Goal has been reached.");

        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        if (totalDonations >= goal) {
            goalReached = true;
        }
    }

    function withdrawFunds() public {
        require(msg.sender == creator, "Only the fundraiser creator can withdraw.");
        require(goalReached, "Goal not reached.");
        require(block.timestamp >= deadline, "Cannot withdraw before deadline.");

        payable(creator).transfer(address(this).balance);
    }

    function getDetails() public view returns (string memory, string memory, uint, uint, uint, bool) {
        return (name, description, goal, deadline, totalDonations, goalReached);
    }
}
