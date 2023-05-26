import React from 'react'
import "./styles.scss"
import logoBrinks from "../../image/howItWorks_brinks.png"
import logoAry from "../../image/howItWorks_AryJan.png"
import { Link } from 'react-router-dom'
import { CopyBlock, nord } from "react-code-blocks";

type Props = {}

const HowItWorks = (props: Props) => {
    const text=` /// @notice mint the NFT once the proposal accepted
    /// @notice update the nbr of fraction of the nft
    /// @notice only for the contract owner
    /// @dev set msg.sender as royalty receiver though ERC2981 methos '_setToKenRoyalty'
    /// @param _nftId id of the NFT to update
    /// @param _nftURI URI of the NFT minted
    function mintNft(
        uint256 _nftId,
        string calldata _nftURI
    ) external onlyOwner {
        require(
            nftList[_nftId].status == Status.accepted,
            "nft status isn't accepted"
        );
        // require(msg.sender == nftList[_nftId].minter, "not the nft proposer");
        uint256 sharesQty = nftList[_nftId].sharesQty;
        _mint(nftList[_nftId].minter, _nftId, sharesQty, "");
        _setURI(_nftId, _nftURI);
        _setTokenRoyalty(_nftId, nftList[_nftId].minter, _baseFeeNumerator);
        nftList[_nftId].status = Status.minted;
        emit mintProposalStatusUpdateEvent(_nftId, 3);
    }`

  return (
    <div className='howItWorks'>
        <div className="howItWorks__title">
            TRUSTED TECHNOLOGY
        </div>
        <div className="howItWorks__text">
            <p>Based on blockchain technology, Collector Chain insert the scarcity and stocking informations of the assets into custom ownership shares NFTs</p>
            <p>The proof of authenticity and proof of secured storage <strong>are directly integrated in each ownership shares</strong></p>
        </div>
        <div className="howItWorks__text--code"><CopyBlock language="jsx" text={text} theme={nord} codeBlock={false}/></div>
        {/* <div className="howItWorks__image"> */}
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
            <div className="howItWorks__image-item"></div>
        {/* <img src={imgCoin} alt="coin_img" /> */}
        {/* </div> */}
        <div className="blueBackground">
            <div className="howItWorks__title--rightAlign">
                <br/>TRUSTED PARTNERS
            </div>
            <div className="howItWorks__text--rightAlign">
                <p>Collector Chain collectibles are<strong> authentified by our experts panel</strong></p>
                <p>They are stored and insured by <strong>professional storage partners</strong></p>
                <p><strong>The proof of authenticity and proof of storage</strong> provided by our partners are availables and displayed for all the assets of the collection</p>
            </div>
            {/* <div className="logo">
                <img src={logoBrinks} alt="logo_brinks" />
                <img src={logoAry} alt="logo_ary" />
            </div> */}
        </div>
        <div className="howItWorks__title">
            OUR PROCESS
        </div>
        <div className="howItWorks__text">
        You can follow in real time the advancement of your requests in "my requests" tab
        </div>
        <div className="howItWorks__text">
        <strong>1- SUBMIT YOUR OBJECT</strong>  <br/>
        Propose your object and provide the main informations on it : proof of ownership, proof of storage in one of our storage partner, number of fractions wanted(1 to 100) 
        </div>
        <div className="howItWorks__text">
        <strong>2- VALIDATION </strong> <br/>
        After security checks, the admin validate your submission, create the ownership fractions and sends them all to your wallet in the form of NFTs
        </div>
        <div className="howItWorks__text">
        <strong>3- MAKE WHAT YOU WANT !</strong>  <br/>
        Once the fractions received, you can sell fraction by fraction, or simply hold them !
        </div>
        <div className="howItWorks__blueBackground">
            <button className='howItWorks__blueBackground__createButton'><Link className='link' to='/create'>FRACTIONALIZE YOUR COLLECTIBLE</Link> </button>
        </div>
    </div>
  )
}

export default HowItWorks