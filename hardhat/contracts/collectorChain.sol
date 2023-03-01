// SPDX-License-Identifier: Apache 2.0

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CollectorChain is ERC1155URIStorage, Ownable {
    /// @dev init of URI param
    string constant collectionURI_ = "";
    /// @dev init of _id param to use for nft id counter during mint and stocker id counter during stoker creation
    uint256 public _nftIdCounter;
    uint256 public _stockerIdCounter;

    /// @dev init of royaltee param at 5%
    uint8 public royaltee = 5;

    enum Status {
        proposed,
        accepted,
        rejected,
        minted,
        burned
    }

    /// @notice main information of the NFT
    struct Nft {
        address minter;
        string nftName;
        uint256 stockerId;
        Status status;
    }

    struct Stocker {
        address stockerAddr;
        string stockerName;
    }

    /// @notice mapping of all the NFT related to their ID
    mapping(uint256 => Nft) nftList;

    mapping(uint256 => Stocker) stockerList;

    constructor() ERC1155(collectionURI_) {}

    /// @notice ask for a mint
    function createMintProposal() external {}

    /// @notice accept or not the mint proposal
    /// @notice only for contract owner
    function setMintProposalStatus() external onlyOwner {}

    /// @notice mint the NFT once the proposal accepted
    function mintNft() external {}

    /// @notice creation of a new stocker
    /// @notice only for contract owner
    function stockerCreation(address _stockerAddr, string memory _stockerName)
        external
        onlyOwner
    {
        uint256 currentStockerId = _stockerIdCounter;
        Stocker memory newStocker = Stocker(_stockerAddr, _stockerName);
        stockerList[currentStockerId] = newStocker;
        _stockerIdCounter++;
    }
}
