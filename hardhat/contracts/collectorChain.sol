// SPDX-License-Identifier: Apache 2.0

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/common/ERC2981.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CollectorChain is ERC1155URIStorage, ERC2981, Ownable {
    /// @dev init of URI param
    string constant collectionURI_ = "";
    /// @dev init of _id param to use for nft id counter during mint and stocker id counter during stoker creation
    uint256 public _nftIdCounter;
    uint256 public _stockerIdCounter;
    /// @dev init royalty fees to 5%
    uint96 public _baseFeeNumerator = 500;

    string public contractMetaDataURI;

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

    /// @notice main information of the NFT
    struct Stocker {
        address stockerAddr;
        string stockerName;
    }

    /// @notice mapping of all the NFT related to their ID
    mapping(uint256 => Nft) public nftList;
    /// @dev mapping to be able to create require on nftId
    mapping(uint256 => bool) public isNftExist;
    /// @notice mapping of all the stocker related to their ID
    mapping(uint256 => Stocker) public stockerList;

    /// @dev events for front end purpose
    event mintProposalCreationEvent(uint256 mintProposalId);
    event mintProposalStatusUpdateEvent(uint256 mintProposalId, uint8 status);
    event stockerCreationEvent(uint256 stockerId);

    constructor() ERC1155(collectionURI_) {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @notice ask for a mint
    /// @dev set the initial shares quantity to 1
    /// @param _nftName name of the nft
    /// @param _stockerId id of the stocker of the object
    /// @param _imageURL URL of the main picture of the NFT
    /// @param _sharesQty quantity of fraction wanted for the NFT
    function createMintProposal(
        string calldata _nftName,
        uint256 _stockerId,
        string calldata _imageURL,
        uint256 _sharesQty
    ) external {
        uint256 currentNftId = _nftIdCounter;
        Nft memory newNft = Nft(
            currentNftId,
            msg.sender,
            _nftName,
            _stockerId,
            Status.proposed,
            _imageURL,
            _sharesQty
        );
        nftList[currentNftId] = newNft;
        isNftExist[currentNftId] = true;
        emit mintProposalCreationEvent(_nftIdCounter);
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
            emit mintProposalStatusUpdateEvent(_nftId, 1);
        } else {
            nftList[_nftId].status = Status.rejected;
            emit mintProposalStatusUpdateEvent(_nftId, 2);
        }
    }

    /// @notice mint the NFT once the proposal accepted
    /// @notice update the nbr of fraction of the nft
    /// @notice only for the nft proposer
    /// @dev set msg.sender as royalty receiver though ERC2981 methos '_setToKenRoyalty'
    /// @param _nftId id of the NFT to update
    /// @param _nftURI URI of the NFT minted
    function mintNft(uint256 _nftId, string calldata _nftURI) external {
        require(
            nftList[_nftId].status == Status.accepted,
            "nft status isn't accepted"
        );
        require(msg.sender == nftList[_nftId].minter, "not the nft proposer");
        uint256 sharesQty = nftList[_nftId].sharesQty;
        _mint(msg.sender, _nftId, sharesQty, "");
        _setURI(_nftId, _nftURI);
        _setTokenRoyalty(_nftId, msg.sender, _baseFeeNumerator);
        nftList[_nftId].status = Status.minted;
        emit mintProposalStatusUpdateEvent(_nftId, 3);
    }

    /// @notice creation of a new stocker
    /// @notice only for contract owner
    /// @param _stockerAddr wallet address of the stocker (to manage potential royaltee)
    /// @param _stockerName Name of the stocker
    function stockerCreation(address _stockerAddr, string calldata _stockerName)
        external
        onlyOwner
    {
        uint256 currentStockerId = _stockerIdCounter;
        Stocker memory newStocker = Stocker(_stockerAddr, _stockerName);
        stockerList[currentStockerId] = newStocker;
        emit stockerCreationEvent(_stockerIdCounter);
        _stockerIdCounter++;
    }

    /// @notice function to modify the collection base fee (applied to all nft)
    /// @param _fee value in bips (ie : 500 = 5% of fee)
    function setBaseFee(uint96 _fee) public onlyOwner {
        require(_fee <= 10000, "fee too high");
        _baseFeeNumerator = _fee;
    }

    function setContractURI(string calldata _contractURI) public onlyOwner {
        contractMetaDataURI = _contractURI;
    }

    function contractURI() public view returns (string memory) {
        return contractMetaDataURI;
    }
}
