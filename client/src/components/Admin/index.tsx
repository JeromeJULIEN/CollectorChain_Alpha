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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


interface NftType {
  nftId : number,
  nftName : string,
  minter : string,
  objectImageURL : string,
  storageImageURL : string,
  authImageURL : string,
  sharesQty : number,
  status : number
}


interface AdminProps {
  isAdmin : boolean,
  contractAddress? : `0x${string}` | undefined,
  isGoodNetwork? : boolean,
  isConnected? : boolean,
  address? : `0x${string}`,
  route? : string
}

const Admin = (props: AdminProps) => {

  const [stateNfts,setStateNfts] = useState<NftType[] | undefined>([]) // NFTs array used for display

  //! :::: IFINITE SCROLL VARIABLES ::::
  const dataIncrement = 10 // nbr of item loaded at each step
  const [hasMore,setHasMore] = useState(true)
  const [ownedNfts,setOwnedNfts] = useState<NftType[] | undefined>([])
  const [infiniteScrollDataLength,setInfiniteScrollDataLength] = useState(dataIncrement) 
  const [infiniteScrollCounter, setInfiniteScrollCounter] = useState(0)

  //! :::: SORTING VARIABLE ::::
  const [sortingValue,setSortingValue] = useState("all")

  const sortChange = (event : any, newSort:string) => {
    console.log("event =>", event.target, "new sort=>",newSort);
    setSortingValue(newSort)
    
  }

  //! WAGMI
  const {data : nftCounter} : { data: number | undefined } = useContractRead({
    address: props.contractAddress,
    abi: contractABI.abi,
    functionName : "_nftIdCounter",
    args : []
  })

  //? :::: MULTICALL --> Warning : multicall is not suported by hardhat
  const numberArray : number[] = []

  const nftCounterTyped : number | undefined = nftCounter

  if(nftCounter) {
    console.error("nft counter =>", nftCounter.toString());
    
    // for(let i = 0 ; i < nftCounterTyped ; i++){
    //   numberArray.push(i)
    // }
    for(let i = (parseInt(nftCounter.toString())-1) ; i >= 0 ; i--){
      numberArray.push(i)
    }
    console.log("number array=>", numberArray);
  }
    
  
  
  const nftReads : any = numberArray.map(
    (number) => 
    ({
      address: props.contractAddress,
      abi: contractABI.abi,
      functionName : "nftList",
      args : [number]
    } as const)
  )

  const {data : nfts} : {data : NftType[] | undefined}  = useContractReads({contracts: nftReads})
  console.log("nfts =>", nfts);

  //? ::::: end test multicall

  // Loader at page init
  const [isLoading,setIsLoading] = useState<boolean>(true)

  

  //! FIN WAGMI

  
//! :::: INFINITE SCROLL ::::
  // function to update number of data to display
  const loadMoreNFT = () => {
    console.log(":::: LOAD MORE PLEASE :::: stateNfts.length =>", stateNfts?.length, "and nftCounter =>",nftCounterTyped);
    if(!nftCounterTyped) {return}
    console.log("old counter =>", infiniteScrollCounter, "data length =>", infiniteScrollDataLength);
    // condition to load more data
    if (infiniteScrollDataLength <= nftCounterTyped/*.toNumber()*/) {
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
      if (nfts?.length == nftCounter /*&& Array.isArray(nfts)*/) {
        await wait(1000)
        setIsLoading(false);
        const slicedNfts  = nfts?.slice(0,infiniteScrollDataLength)
        // setStateNfts(slicedNfts)
        if(sortingValue === "all") {
          // const allNfts : any = nfts?.slice(0,infiniteScrollDataLength)
          setStateNfts(slicedNfts)
        } else {
          // const allNfts : NftType[] | undefined  = nfts?.slice(0,infiniteScrollDataLength)
          const sortedNfts = slicedNfts?.filter(nft => nft.status == parseInt(sortingValue) )
          console.log("new sorting value =>", sortingValue);
          console.log("new sorted nfts =>", sortedNfts);
          setStateNfts(sortedNfts)
        }
        // if (props.route === 'user') {
        //   const ownedNfts = stateNfts?.filter(nft => nft.minter == props.address )
        //   setStateNfts(ownedNfts)
        // }

      }
    }
    handleLoading()
  }, [nfts, infiniteScrollDataLength, nftCounter]);

  //! :::: SORTING ::::
  useEffect(()=> {
    if(sortingValue === "all") {
      const allNfts : any = nfts?.slice(0,infiniteScrollDataLength)
      setStateNfts(allNfts)
    } else {
      const allNfts : NftType[] | undefined  = nfts?.slice(0,infiniteScrollDataLength)
      const sortedNfts = allNfts?.filter(nft => nft.status == parseInt(sortingValue) )
      console.log("new sorting value =>", sortingValue);
      console.log("new sorted nfts =>", sortedNfts);
      setStateNfts(sortedNfts)
    }
  },[sortingValue])


  //! :::: FILTERING NFTS FOR USER REQUEST VIEW ::::
  useEffect(()=>{
    if (props.route === 'user') {
        const ownedNfts = stateNfts?.filter(nft => nft.minter == props.address )
        setOwnedNfts(ownedNfts)
        console.error("owned nfts =>", ownedNfts);
        
      } else return
  },[props.address,stateNfts])

  //! :::: FUNCTIONS ::::
  const openNftLink = (e : any) => (  
    window.open(`https://testnets.opensea.io/assets/mumbai/0x0f36e01b1b0acf17718383e7fe2e873be7b706ec/${e.target.id}`)
  )



  return (
    <div className='admin'>
    {!props.isConnected && <ConnectModal/>}
    {!props.isGoodNetwork && props.isConnected && <SwitchNetworkModal/>}
    {/* {props.isAdmin === false ? 
    <h1 className='admin__title'>You're not the admin</h1> 
    : */}
    {isLoading ? 
    <>
      {/* <h1 className='admin__title'>Fractionalization requests administration</h1>  */}
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
    {props.route === "admin" && 
      <>
        <h1 className='admin__title'>Fractionalization requests administration</h1> 
        {!props.isAdmin && <p>For demo only. You shouldn't have acces</p>}
      </>
    }
    {props.route === "user" && <h1 className='admin__title'>My fractionalization requests </h1> }
    <ToggleButtonGroup
      size='small'
      color='primary'
      value={sortingValue}
      exclusive
      onChange={sortChange}
      aria-label="nft sorting"
      sx={{height:'2rem',margin:'1rem 0',borderRadius:'none', fontWeight:500}}
      fullWidth={true}
    >
      <ToggleButton value="all" aria-label="all" sx={{fontWeight:'bold'}}>
        <p>All</p>
      </ToggleButton>
      <ToggleButton value="0" aria-label="pending" sx={{fontWeight:'bold'}}>
        <p>Pending</p>
      </ToggleButton>
      <ToggleButton value="1" aria-label="accepted" sx={{fontWeight:'bold'}}>
        <p>Accepted</p>
      </ToggleButton>
      <ToggleButton value="3" aria-label="created" sx={{fontWeight:'bold'}}>
        <p>Created</p>
      </ToggleButton>
      <ToggleButton value="2" aria-label="refused" sx={{fontWeight:'bold'}}>
        <p>Refused</p>
      </ToggleButton>
    </ToggleButtonGroup>
    <div className="admin__nftList blueBackground_admin">
      <InfiniteScroll
        dataLength={infiniteScrollDataLength}
        next={loadMoreNFT}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
      >
        {/* {nfts?.map((nft : any)=>  */}
        {props.route === "admin" && stateNfts?.map((nft : any)=> 
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
        {props.route === "user" && ownedNfts?.length == 0 ?
        <>
          <p>It seems that your didn't ask for any <strong>creation</strong> for the moment !</p>
          <button className='admin__button__init'><Link className='link' to='/create'>CREATE YOUR FIRST ASSET</Link> </button>
        </>
        :
         ownedNfts?.map((nft : any)=> 
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