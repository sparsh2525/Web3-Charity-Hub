// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    struct Donation {
        string name;
        address userID;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;

    function donate(string memory _name, uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        donations.push(Donation(_name, msg.sender, _amount, block.timestamp));
    }

    function getTotalDonations(string memory _name) public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < donations.length; i++) {
            if(keccak256(abi.encodePacked(donations[i].name)) == keccak256(abi.encodePacked(_name))){
                total += donations[i].amount;
            }  
        }
        return total;
    }

    function getDonationCount() public view returns (uint256) {
        return donations.length;
    }
}
