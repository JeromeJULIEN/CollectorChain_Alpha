import React, { useEffect, useState } from 'react'
import { useContractEvent, useContractRead, useContractReads } from 'wagmi'
import { BigNumber, ethers } from 'ethers'
import "./styles.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Blocks } from 'react-loader-spinner';
import { wait } from '../Utils/wait';
import openseaLogo from "../../image/openSea_logo.png"
import ConnectModal from '../Modals/connectModal';
import SwitchNetworkModal from '../Modals/switchNetworkModal';
import InfiniteScroll from 'react-infinite-scroll-component';





interface AdminProps {
  isAdmin : boolean,
  contractAddress? : `0x${string}` | undefined,
  isGoodNetwork? : boolean,
  isConnected? : boolean
}

const Admin = (props: AdminProps) => {
  //! :::: IFINITE SCROLL VARIABLES ::::
  const dataIncrement = 5
  const [hasMore,setHasMore] = useState(true)
  const [stateNfts,setStateNfts] = useState([])
  const [infiniteScrollDataLength,setInfiniteScrollDataLength] = useState(dataIncrement) 
  const [infiniteScrollCounter, setInfiniteScrollCounter] = useState(0)

  //! WAGMI
  const {data : nftCounter} : { data: number | undefined } = useContractRead({
    address: props.contractAddress,
    abi: contractABI.abi,
    functionName : "_nftIdCounter",
    args : []
  })

  //? :::: MULTICALL --> Warning : multicall is not suported by hardhat
  const numberArray : number[] = []

  const nftCounterTyped : any = nftCounter
  for(let i = 0 ; i < nftCounterTyped ; i++){
    numberArray.push(i)
  }
  // console.log("number array=>", numberArray);
    
  
  
  const nftReads : any = numberArray.map(
    (number) => 
    ({
      address: props.contractAddress,
      abi: contractABI.abi,
      functionName : "nftList",
      args : [number]
    } as const)
  )

  const {data : nfts}  = useContractReads({contracts: nftReads})
  console.log("nfts =>", nfts);
  //? ::::: end test multicall

  // Loader at page init
  const [isLoading,setIsLoading] = useState<boolean>(true)

  

  //! FIN WAGMI

  
//! :::: INFINITE SCROLL ::::
  // function to update number of data to display
  const loadMoreNFT = () => {
    console.log(":::: LOAD MORE PLEASE :::: stateNfts.length =>", stateNfts.length, "and nftCounter =>",nftCounterTyped.toNumber());
    if(!nftCounter) {return}
    console.log("old counter =>", infiniteScrollCounter, "data length =>", infiniteScrollDataLength);
    // condition to load more data
    if (infiniteScrollDataLength <= nftCounterTyped.toNumber()) {
      console.error('try to load more');
      setInfiniteScrollCounter(infiniteScrollCounter+1)
      setInfiniteScrollDataLength(infiniteScrollDataLength + dataIncrement)
      console.log("new counter =>", infiniteScrollCounter);
      console.log("new data length =>", infiniteScrollDataLength);
    } else 
    // condition to stop loading new data
    {
      console.error('should stop');
      setHasMore(false)
    }
  }

  // useEffect to update the list with the new number of data
  useEffect(() => {
    const handleLoading = async() => {
      if (nfts && Array.isArray(nfts)) {
        await wait(1000)
        setIsLoading(false);
        const slicedNfts = nfts.slice(0,infiniteScrollDataLength)
        setStateNfts(slicedNfts as never[])
      }
    }
    handleLoading()
  }, [nfts, infiniteScrollDataLength]);

  //! :::: FUNCTIONS ::::
  const openNftLink = (e : any) => (  
    window.open(`https://testnets.opensea.io/assets/mumbai/0x0f36e01b1b0acf17718383e7fe2e873be7b706ec/${e.target.id}`)
  )



  return (
    <div className='admin'>
    {!props.isConnected && <ConnectModal/>}
    {!props.isGoodNetwork && props.isConnected && <SwitchNetworkModal/>}
    {props.isAdmin === false ? 
    <h1 className='admin__title'>You're not the admin</h1> 
    :
    isLoading ? 
    <>
      <h1 className='admin__title'>Mint request administration</h1> 
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </>
    :
    <>
    <h1 className='admin__title'>Mint request administration</h1> 
    <div className="admin__nftList blueBackground">
      <InfiniteScroll
        dataLength={infiniteScrollDataLength}
        next={loadMoreNFT}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
      >
        {/* {nfts?.map((nft : any)=>  */}
        {stateNfts?.map((nft : any)=> 
          <div className="admin__nftList__item" key={nft.nftId}>
            <div className="admin__nftList__item__img"><img  src={`https://ipfs.io/ipfs/${nft.objectImageURL}`} alt="object main" /></div>
            <div className="admin__nftList__item__data">
              <p className="admin__nftList__item__data--title">{nft.nftName}</p>
              <p className="admin__nftList__item__data--status">
                {nft.status === 0 && <p className="admin__nftList__item__data--status--orange"> Pending</p>}
                {nft.status === 1 && <p className="admin__nftList__item__data--status--green"> Accepted</p>}
                {nft.status === 2 && <p className="admin__nftList__item__data--status--red"> Refused</p>}
                {nft.status === 3 && <p className="admin__nftList__item__data--status--blue"> Created</p>}
                {nft?.status === 3 && <img className="admin__nftList__item__image" src={openseaLogo} alt='opensea logo' onClick={openNftLink} id={nft.nftId}></img>}

              </p>
            </div>
            <Link to={`/requestdetail/${nft.nftId}`}>
              <div className='admin__button__icon'><ArrowForwardIcon fontSize='large'/></div>
            </Link>
          </div>
        )}
      </InfiniteScroll>
    </div>    
    </>
    }
    </div>
    
  )
}

export default Admin