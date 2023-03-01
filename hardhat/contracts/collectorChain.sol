// SPDX-License-Identifier: Apache 2.0

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/common/ERC2981.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CollectorChain is ERC1155URIStorage, Ownable {
    /// @dev init of URI param
    string constant collectionURI_ = "";
    /// @dev init of _id param to use for nft id counter during mint and stocker id counter during stoker creation
    uint256 public _nftIdCounter;
    uint256 public _stockerIdCounter;

    /// @dev init of royaltee param at 5%
    uint8 public royaltee = 5;

    /// @dev possible status for each nft
    enum Status {
        proposed,
        accepted,
        rejected,
        minted,
        burned
    }

    /// @notice main information of the NFT
    struct Nft {
        uint256 nftId;
        address minter;
        string nftName;
        uint256 stockerId;
        Status status;
        string imageURL;
        uint256 sharesQty;
    }

    struct Stocker {
        address stockerAddr;
        string stockerName;
    }

    /// @notice mapping of all the NFT related to their ID
    mapping(uint256 => Nft) nftList;
    /// @dev mapping to be able to create require on nftId
    mapping(uint256 => bool) isNftExist;

    mapping(uint256 => Stocker) stockerList;

    constructor() ERC1155(collectionURI_) {}

    /// @notice ask for a mint
    /// @dev set the initial shares quantity to 1
    /// @param _nftName name of the nft
    /// @param _stockerId id of the stocker of the object
    /// @param _imageURL URL of the main picture of the NFT
    function createMintProposal(
        string calldata _nftName,
        uint256 _stockerId,
        string calldata _imageURL
    ) external {
        uint256 currentNftId = _nftIdCounter;
        Nft memory newNft = Nft(
            currentNftId,
            msg.sender,
            _nftName,
            _stockerId,
            Status.proposed,
            _imageURL,
            1
        );
        nftList[currentNftId] = newNft;
        isNftExist[currentNftId] = true;
        _nftIdCounter++;
    }

    /// @notice accept or not the mint proposal. Should modify the status of the NFT
    /// @notice only for contract owner
    /// @param _vote 1 = accepted,  0 = rejected
    /// @param _nftId id of the NFT to update
    function setMintProposalStatus(bool _vote, uint256 _nftId)
        external
        onlyOwner
    {
        require(isNftExist[_nftId], "nft doesn't exist");
        require(
            nftList[_nftId].status == Status.proposed,
            "NFT status is not proposed"
        );

        if (_vote) {
            nftList[_nftId].status = Status.accepted;
        } else {
            nftList[_nftId].status = Status.rejected;
        }
    }

    /// @notice mint the NFT once the proposal accepted
    /// @notice update the nbr of fraction of the nft
    /// @notice only for the nft proposer
    /// @param _nftId id of the NFT to update
    /// @param _sharesQty quantity of fraction wanted for the NFT
    function mintNft(uint256 _nftId, uint256 _sharesQty) external {
        require(
            nftList[_nftId].status == Status.accepted,
            "nft status isn't accepted"
        );
        require(msg.sender == nftList[_nftId].minter, "not the nft proposer");
        _mint(msg.sender, _nftId, _sharesQty, "");
        nftList[_nftId].status = Status.minted;
        nftList[_nftId].sharesQty = _sharesQty;
    }

    /// @notice creation of a new stocker
    /// @notice only for contract owner
    /// @param _stockerAddr wallet address of the stocker (to manage potential royaltee)
    /// @param _stockerName Name of the stocker
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
