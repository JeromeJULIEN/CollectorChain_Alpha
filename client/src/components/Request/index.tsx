import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Link, useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';



interface RequestProps {
  contractAddress? : `0x${string}`,
  address? : `0x${string}`
}

const Request = (props : RequestProps) => {
  //! :::: LOCAL STATE ::::
  const [ownedNftList,setOwnedNftList] = useState([])


  //! :::: WAGMI ::::
  // Get the current collection id counter
 const {data : nftCounter} = useContractRead({
  address: props.contractAddress,
  abi: contractABI.abi,
  functionName : "_nftIdCounter",
  args : []
})

// create an array from O yo "nftCounter"
const numberArray : number[] = []

const nftCounterTyped : any = nftCounter
for(let i = 0 ; i < nftCounterTyped ; i++){
  numberArray.push(i)
}  

// prepare multicall read
const nftReads : any = numberArray.map(
  (number) => 
  ({
    address: props.contractAddress,
    abi: contractABI.abi,
    functionName : "nftList",
    args : [number]
  } as const)
)

// Make multicall read
const {data : nfts}  = useContractReads({contracts: nftReads})
// console.log("nfts =>", nfts);
//! :::: WAGMI END ::::

useEffect(()=>{
  let ownedNft : any =[]
   nfts?.map((nft : any)=>{
    if(nft.minter === props.address) {
      ownedNft.push(nft)
    }
  })
  // console.log("ownedNft=>",ownedNft, ownedNft.length);
  setOwnedNftList(ownedNft)
  
  
},[nfts, props.address])



  return (
    <div className='request'>
        <h1 className='request'>My mint request</h1> 
        {ownedNftList.length > 0 ? 
        <div className="request">
          {ownedNftList.map((nft : any)=> 
            <div className="request__nftList__item" key={nft.nftId}>
              <p>{nft.nftId.toString()}</p>
              <p>{nft.nftName}</p>
              <p>{
                nft.status === 0 && <>pending</>
                }</p>
              <p><img className="request__nftList__item--img" src={`https://ipfs.io/ipfs/${nft.objectImageURL}`} alt="object main" /></p>
              <Link to={`/requestdetail/${nft.nftId}`}><button><SettingsIcon/></button></Link>
            </div>
          )}
        </div>
        : 
        <p>It seems you didn't ask for mint for the moment</p>
        }
    </div>
  )
}

export default Request