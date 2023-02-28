// SPDX-License-Identifier: Apache 2.0

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CollectorChain is ERC1155URIStorage, Ownable {
    string constant collectionURI_ = "";
    uint256 private _id;

    /// @notice main information of the NFT
    struct Nft {
        address minter;
        string NftName;
        uint256 StockerId;
        uint256 value;
    }

    /// @notice list of all the NFT related to their ID
    mapping(uint256 => Nft) nftList;

    constructor() ERC1155(collectionURI_) {}

    /// @notice ask for a mint
    function createMintProposal() external {}

    /// @notice accept or not the mint proposal
    /// @notice only for contract owner
    function setMintProposalStatus() external onlyOwner {}

    /// @notice mint the NFT once the proposal accepted
    function mintNft() external {}
}
