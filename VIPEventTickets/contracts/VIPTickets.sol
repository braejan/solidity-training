// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VIPTickets is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol){
        _mint(msg.sender, initialSupply * (10**decimals()));
    }

    function decimals() public pure override returns (uint8){
        return 6;
    }
}