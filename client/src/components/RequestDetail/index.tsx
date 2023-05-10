import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useContractRead } from 'wagmi';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"


interface RequestDetailProps {
  contractAddress? : `0x${string}`,
  address? : `0x${string}`,
  isGoodNetwork? : boolean,
  isAdmin? : boolean
}

interface NFTItem {
  nftId : number,
  minter : string,
  nftName : string,
  objectImageURL : string,
  authImageURL : string,
  storageImageURL : string,
  sharesQty : number,
  status : number
}

const RequestDetail = (props: RequestDetailProps) => {
  const {id} = useParams()

  //! :::: WAGMI ::::
  const {data : nft} : {data? : NFTItem}= useContractRead({
    address : props.contractAddress,
    abi:contractABI.abi,
    functionName : "nftList",
    args : [id]
  })

  //! :::: FUNCTIONS ::::
  const navigate = useNavigate()
  const navigateToPrevious = () => {
    navigate(-1)
  }

  console.log("nft to display =>",nft);

  

  return (
     <>
      {nft && 
      <div className='requestDetail'>Request detail : {nft.nftName} <button onClick={navigateToPrevious}><BackspaceIcon/></button></div>
      }
     </>
    
  )
}

export default RequestDetail