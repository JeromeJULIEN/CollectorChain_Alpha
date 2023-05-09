import React, { useEffect, useState } from 'react'
import { useContractEvent, useContractRead, useContractReads } from 'wagmi'
import { BigNumber, ethers } from 'ethers'
import "./styles.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import { Link } from 'react-router-dom';


interface AdminProps {
    isAdmin : boolean,
    contractAddress? : `0x${string}` | undefined
}

interface NFTItem {
  nftId : number,
  minter : string,
  title : string,
  objectImageURL : string,
  authImageURL : string,
  storageImageURL : string,
  sharesQty : number,
  status : number
}

interface fetchedData {
  data : NFTItem[]
}

const Admin = (props: AdminProps) => {
  //! TEST EVENTS AVEC WAGMI
  const [stateNftList,setStateNftList] = useState<any>([])

  
  const GetNft = async (id : number) => {
    console.log("id from GetNft=>",id);
    
    const {data : nftItem} = await useContractRead({
      address: props.contractAddress,
      abi: contractABI.abi,
      functionName : "nftList",
      args : [id]
    })
    return nftItem
  }

  const {data : nftCounter} = useContractRead({
    address: props.contractAddress,
    abi: contractABI.abi,
    functionName : "_nftIdCounter",
    args : []
  })

  //? :::: Potential solution using multicall --> the issue is that multicall is not suported by hardhat
  const numberArray : number[] = []

  if(true) {
    const nftCounterTyped : any = nftCounter
    for(let i = 0 ; i < nftCounterTyped ; i++){
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

  const {data : nfts}  = useContractReads({contracts: nftReads})
  // console.log("nfts =>", nfts);
  //? ::::: end test multicall

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
  //! FIN TEST EVENT AVEC WAGMI



  return (
    <>
    {props.isAdmin === true ? 
    <>
    <h1 className='admin'>Mint request</h1> 
    <div className="admin__nftList">
      {nfts?.map((nft : any)=> 
        <div className="admin__nftList__item">
          <p>{nft.nftId.toString()}</p>
          <p>{nft.nftName}</p>
          <p>{
            nft.status === 0 && <>pending</>
            }</p>
          <p><img className="admin__nftList__item--img" src={`https://ipfs.io/ipfs/${nft.objectImageURL}`} alt="object main" /></p>
          <Link to="/requestdetail/0"><button><SettingsIcon/></button></Link>
        </div>
      )}
      {/* {nftItem0Typed && <div className="admin__nftList__item">
        <p>{nftItem0Typed.nftId.toString()}</p>
        <p>{nftItem0Typed.nftName}</p>
        <p>{
          nftItem0Typed.status === 0 && <>pending</>
          }</p>
        <p><img className="admin__nftList__item--img" src={`https://ipfs.io/ipfs/${nftItem0Typed.objectImageURL}`} alt="object main" /></p>
        <Link to="/requestdetail/0"><button><SettingsIcon/></button></Link>
      </div>}
      {nftItem1Typed && <div className="admin__nftList__item">
        <p>{nftItem1Typed.nftId.toString()}</p>
        <p>{nftItem1Typed.nftName}</p>
        <p>{
          nftItem1Typed.status === 0 && <>pending</>
          }</p>
        <p><img className="admin__nftList__item--img" src={`https://ipfs.io/ipfs/${nftItem1Typed.objectImageURL}`} alt="object main" /></p>
        <button><SettingsIcon/></button>

      </div>} */}
    </div>
    </>
    : <div className='admin'>You're not the admin</div> }
    </>
    
  )
}

export default Admin