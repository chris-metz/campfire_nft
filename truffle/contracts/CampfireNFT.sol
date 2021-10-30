//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CampfireNFT is Ownable, ERC1155 {
    uint256 public constant BRANCH = 0;

    mapping(uint256 => uint256) private _totalSupply;

    constructor()
        ERC1155(
            "https://campfire-nft.fra1.digitaloceanspaces.com/metadata/{id}.json"
        )
    {}

    // function mint(
    //     address account,
    //     uint256 id,
    //     uint256 amount
    // ) public onlyOwner {
    //     _mint(account, id, amount, "");
    // }

    function mintBranch(address account) public {
        _mint(account, BRANCH, 1, "");
        _totalSupply[BRANCH] += 1;
    }

    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public {
        require(msg.sender == account);
        _burn(account, id, amount);
        _totalSupply[BRANCH] -= 1;
    }

    /* add function for tracking the total supply */
    function totalSupply(uint256 tokenId) public view returns (uint256) {
        return _totalSupply[tokenId];
    }

    /*
        name + symbol are no ERC1155 standard, but included for automatic
        marketplace metadata discovery
    */
    function name() public pure returns (string memory) {
        return "CampfireNFT";
    }

    function symbol() public pure returns (string memory) {
        return "CAMPNFT";
    }
}
