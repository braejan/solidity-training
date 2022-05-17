// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract VIPTicketsV1 is
    ERC20Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    // using initialize instead constructor
    function initialize(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 initialSupply
    ) public initializer {
       __ERC20_init(tokenName, tokenSymbol);
       __Ownable_init_unchained();
       __UUPSUpgradeable_init();
       _mint(msg.sender, initialSupply * (10**decimals()));
    }

    function decimals() public pure override returns (uint8){
        return 6;
    }

    // Override this function is required by proxy to work
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{}
}