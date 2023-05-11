import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Link, useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { wait } from '../Utils/wait'
import { Blocks } from 'react-loader-spinner'




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
  console.log("ownedNft=>",ownedNft, ownedNft.length);
  setOwnedNftList(ownedNft)
  
  
},[nfts, props.address])

// Loader at page init
const [isLoading,setIsLoading] = useState<boolean>(true)

useEffect(() => {
  const handleLoading = async() => {
    if (ownedNftList) {
      await wait(1000)
      setIsLoading(false);
    }
  }
  handleLoading()
}, [ownedNftList]);



  return (
    <div className='request'>
        <h1 className='request'>My mint request</h1> 
        {isLoading ? 
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
        :
        ownedNftList.length > 0 ? 
        <div className="request blueBackground">
          {ownedNftList.map((nft : any)=> 
            <div className="request__nftList__item" key={nft.nftId}>
            <div className="request__nftList__item__img"><img  src={`https://ipfs.io/ipfs/${nft.objectImageURL}`} alt="object main" /></div>
            <div className="request__nftList__item__data">
              <p className="request__nftList__item__data--title">{nft.nftName}</p>
              <p className="request__nftList__item__data--status">Status : 
                {nft.status === 0 && <p className="admin__nftList__item__data--status--orange"> pending</p>}
                {nft.status === 1 && <p className="admin__nftList__item__data--status--green"> accepted</p>}
                {nft.status === 2 && <p className="admin__nftList__item__data--status--red"> refused</p>}
              </p>
            </div>
            <Link to={`/requestdetail/${nft.nftId}`}>
              <div className='request__button__icon'><ArrowForwardIcon fontSize='large'/></div>
            </Link>
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