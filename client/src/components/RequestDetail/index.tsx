import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useContractRead } from 'wagmi';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { wait } from '../Utils/wait';
import { Blocks } from 'react-loader-spinner';



interface requestDetailProps {
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

const RequestDetail = (props: requestDetailProps) => {
  const {id} = useParams()
  
  //! :::: LOCAL STATE ::::
  const [objPictureModal,setObjPictureModal] = useState<boolean>(false)
  const [authPictureModal,setAuthPictureModal] = useState<boolean>(false)
  const [storagePictureModal,setStoragePictureModal] = useState<boolean>(false)
  
  //! :::: WAGMI ::::
  const {data : nft} : {data? : NFTItem}= useContractRead({
    address : props.contractAddress,
    abi:contractABI.abi,
    functionName : "nftList",
    args : [id],
    onError(error) {
      console.log('Error', error)
    },
  })
  //! :::: TEST ::::
  console.log("nft to display =>",nft, "id =>",id);

  // Loader at page init
  const [isLoading,setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleLoading = async() => {
      if (nft) {
        await wait(1000)
        setIsLoading(false);
      }
    }
    handleLoading()
  }, [nft]);

  //! :::: FUNCTIONS ::::
  const navigate = useNavigate()
  const navigateToPrevious = () => {
    navigate(-1)
  }

  // const formatETHAddress = (s:any, size:number) =>{;
  //   var first = s.slice(0, size + 1);
  //   var last = s.slice(-size);
  //   return first + "..." + last;
  // }

  // const addressToDisplay = useMemo(()=>{
  //   return formatETHAddress(nft?.minter,3)
  // },[nft])

  const copyToClipboard = () => {
    if (nft) {
      navigator.clipboard.writeText(nft.minter)
      toast.success("address copied to clipboard", {autoClose:1000})
    } else return
  }

  // Modal visibility management
  const openObjectModal = () => {
    setObjPictureModal(true)
  }
  const closeObjectModal = () => {
    setObjPictureModal(false)
  }

  const openAuthModal = () => {
    setAuthPictureModal(true)
  }
  const closeAuthModal = () => {
    setAuthPictureModal(false)
  }

  const openStorageModal = () => {
    setStoragePictureModal(true)
  }
  const closeStorageModal = () => {
    setStoragePictureModal(false)
  }



  

  return (
    <>
    {isLoading ? 
    <div className='requestDetail'>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
    :
    <div className='requestDetail'>
        <h1 className='requestDetail__title'>{nft?.nftName} <button onClick={navigateToPrevious}><BackspaceIcon/></button></h1>
        <h2 className="requestDetail__status">
          <p>Status : </p> 
          {nft?.status === 0 && <p className="requestDetail__status--orange"> pending</p>}
          {nft?.status === 1 && <p className="requestDetail__status--green"> accepted</p>}
          {nft?.status === 2 && <p className="requestDetail__status--red"> refused</p>}
        </h2>
        <div className="requestDetail__item blueBackground">
          <div className="requestDetail__item__pictures">
            <div className="requestDetail__item__pictures__picture">
              <p className="requestDetail__item__pictures__picture__text">Object picture</p>
              <div className="requestDetail__item__pictures__picture__img"><img  src={`https://ipfs.io/ipfs/${nft?.objectImageURL}`} alt="object main" onClick={openObjectModal}/></div>
            </div>
            <div className="requestDetail__item__pictures__picture">
              <p className="requestDetail__item__pictures__picture__text">Authentification picture</p>
              <div className="requestDetail__item__pictures__picture__img"><img  src={`https://ipfs.io/ipfs/${nft?.authImageURL}`} alt="authentification" onClick={openAuthModal}/></div>
            </div>
            <div className="requestDetail__item__pictures__picture">
              <p className="requestDetail__item__pictures__picture__text">Proof of storage picture</p>
              <div className="requestDetail__item__pictures__picture__img"><img  src={`https://ipfs.io/ipfs/${nft?.storageImageURL}`} alt="storage" onClick={openStorageModal}/></div>
            </div>
          </div>
          <div className="requestDetail__item__data">
            {/* <p className="requestDetail__item__data__text">Minter : {addressToDisplay}<ContentCopyIcon onClick={copyToClipboard}/></p> */}
            <p className="requestDetail__item__data__text">Fraction asked : {nft?.sharesQty.toString()}</p>
            {props.isAdmin && <button className="requestDetail__button requestDetail__button--big" >ACCEPT AND MINT</button>}
            {props.isAdmin && <button className="requestDetail__button requestDetail__button--big requestDetail__button--red" >REFUSE</button>}
          </div>
        </div>
    </div>
    }
    <Modal 
      className="modal"
      open={objPictureModal}
      onClose={closeObjectModal}
    >
      <img src={`https://ipfs.io/ipfs/${nft?.objectImageURL}`} alt="object"  />
      
    </Modal>
    <Modal 
      className="modal"
      open={authPictureModal}
      onClose={closeAuthModal}
    >
      <img src={`https://ipfs.io/ipfs/${nft?.authImageURL}`} alt="authentification"  />
      
    </Modal>
    <Modal 
      className="modal"
      open={storagePictureModal}
      onClose={closeStorageModal}
    >
      <img src={`https://ipfs.io/ipfs/${nft?.storageImageURL}`} alt="storage"  />
      
    </Modal>
    </>
    
  )
}

export default RequestDetail