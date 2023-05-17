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





interface AdminProps {
  isAdmin : boolean,
  contractAddress? : `0x${string}` | undefined,
  isGoodNetwork? : boolean,
  isConnected? : boolean
}

const Admin = (props: AdminProps) => {
  //! WAGMI
  const {data : nftCounter} = useContractRead({
    address: props.contractAddress,
    abi: contractABI.abi,
    functionName : "_nftIdCounter",
    args : []
  })

  //? :::: Potential solution using multicall --> the issue is that multicall is not suported by hardhat
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

  useEffect(() => {
    const handleLoading = async() => {
      if (nfts) {
        await wait(1000)
        setIsLoading(false);
      }
    }
    handleLoading()
  }, [nfts]);

  //? ::: backup pour test sans multicall
  // const FetchNftList = async() => {
  //   const nftCounterTyped :any = nftCounter
  //   console.log("nftCounter from fetchNftList", nftCounterTyped.toNumber());
  //   let nftList = []
  //   const nft0 = await nftList.push(GetNft(0)) 
  //   setStateNftList(nft0)
  //   const nft1 = await nftList.push(GetNft(1)) 
  //   setStateNftList(nft1)
  //   return nftList
  // }
  
  //   const {data : nftItem0} = useContractRead({
//         address: props.contractAddress,
//         abi: contractABI.abi,
//         functionName : "nftList",
//         args : [0]
//   })
//   const {data : nftItem1} = useContractRead({
//     address: props.contractAddress,
//     abi: contractABI.abi,
//     functionName : "nftList",
//     args : [1]
// })
//   const nftItem0Typed : any = nftItem0
//   const nftItem1Typed : any = nftItem1
  
//   useEffect(()=>{
//     console.log('nft0 from useEffect=>',nftItem0Typed);
//     console.log('nft1 from useEffect=>',nftItem1Typed);
    
//     })
  //! FIN WAGMI

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
      {nfts?.map((nft : any)=> 
        <div className="admin__nftList__item" key={nft.nftId}>
          <div className="admin__nftList__item__img"><img  src={`https://ipfs.io/ipfs/${nft.objectImageURL}`} alt="object main" /></div>
          <div className="admin__nftList__item__data">
            <p className="admin__nftList__item__data--title">{nft.nftName}</p>
            <p className="admin__nftList__item__data--status">Status : 
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
    </div>    
    </>
    }
    </div>
    
  )
}

export default Admin