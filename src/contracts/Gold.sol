// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Gold is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _tokenImage;
    uint256 private _maxMintLimit = 1;

    mapping(address => uint256) private _mintedTokens;

    constructor(string memory name, string memory symbol, string memory tokenImage) ERC721(name, symbol) {
        _tokenImage = tokenImage;
    }

    function mint() public returns (uint256) {
        require(_mintedTokens[msg.sender] < _maxMintLimit, "You have already minted the maximum number of tokens");
        _mintedTokens[msg.sender] += 1;

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        string memory baseURI = "https://bafkreigkeytwvogckjmbyr4zlj2rsggmo2thpgqjqq4u6tjfz3fkq7pt3m.ipfs.nftstorage.link";
        string memory tokenURI = Strings.toString(tokenId);

        return string(abi.encodePacked(baseURI, tokenURI));
    }

    function tokenImage() public view returns (string memory) {
        return _tokenImage;
    }

    function setMaxMintLimit(uint256 maxMintLimit) external {
        _maxMintLimit = maxMintLimit;
    }

    function getMaxMintLimit() external view returns (uint256) {
        return _maxMintLimit;
    }

    function getMintedTokens(address account) external view returns (uint256) {
        return _mintedTokens[account];
    }
}
