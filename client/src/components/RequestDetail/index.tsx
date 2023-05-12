import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useContractRead, usePrepareContractWrite,useContractWrite } from 'wagmi';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { wait } from '../Utils/wait';
import { Blocks } from 'react-loader-spinner';
import { jsonUpload } from '../Utils/jsonUpload';
import generateMetadata from '../Utils/generateMetadata';
import { TRUE } from 'sass';



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
  const [isMintLoading,setIsMintLoading] = useState<boolean>(false)
  const [tokenURI,setTokenURI] = useState<string>()
  const [stocker,setStocker] = useState<string>()
  const [stockingId,setStockingId] = useState<string>()
  const [rarity,setRarity] = useState<number>()

  // Functions to handle input value change
  const handleStockerChange = (event : any) => {
    setStocker(event.target.value)
  }
  const handleStockingIdChange = (event : any) => {
    setStockingId(event.target.value)
  }
  const handleRarityChange = (event : any) => {
    setRarity(event.target.value)
  }
  //! :::: WAGMI ::::
  // Loading of the displayed nft
  const {data : nft} : {data? : NFTItem}= useContractRead({
    address : props.contractAddress,
    abi:contractABI.abi,
    functionName : "nftList",
    args : [id],
    onError(error) {
      console.log('Error', error)
    },
  })

  // REQUEST VALIDATION
  const {config : validationConfig} = usePrepareContractWrite({
    address : props.contractAddress,
    abi: contractABI.abi,
    functionName: "setMintProposalStatus",
    args: [true,id],
    onSuccess(data){
      console.log('succes validationConfig', data);
    },
    onError(data){
      console.error('error validationConfig',data);
      
    }
  })

  const{write : validationWrite} = useContractWrite(validationConfig)

  const validate = async() =>{
    setIsMintLoading(true)
    await validationWrite?.()
    setIsMintLoading(false)
  }

  // REQUEST MINT
  const {config : mintConfig} = usePrepareContractWrite({
    address : "0x7b04f3a108104cc806f64Af41868784741345329",
    abi : contractABI.abi,
    functionName : "mintNft",
    args:[id,tokenURI]
  })
  
  const {write : mintWrite} = useContractWrite(mintConfig)
  
  // Process : 1 - JSON Metadata creation / 2 - pin JSON to IPFS / 3 - mint with metadata ipfsHash
  const generateTokenURI = async() => {
    const metadata = await generateMetadata(
      nft?.nftName,
      nft?.sharesQty,
      nft?.objectImageURL,
      nft?.authImageURL,
      nft?.storageImageURL
    )
    // await mintWrite?.()
    const tokenURIHash : string = await jsonUpload(metadata,nft?.nftId,nft?.nftName)
    setTokenURI(`https://ipfs.io/ipfs/${tokenURIHash}`)
  }

  const launchMint = async() =>{
      setIsMintLoading(true)
      console.log("token URI =>", tokenURI);
      mintWrite?.()
      setIsMintLoading(false)
    }

  const mint = () => {
    generateTokenURI()
    launchMint()
  }

  // Request cancelation


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

  const isOwner = useMemo(()=>{
    console.log("nft.minter =>",nft?.minter, "address =>", props.address);
    if (nft?.minter === props.address){
      return true
    } else return false
  },[nft, props.address])

  const isFilled = useMemo(()=> {
    if(stocker && stockingId ) {
      return true
    } else {
      return false
    }
  },[stocker,stockingId])
  

  //! :::: FUNCTIONS ::::
  const navigate = useNavigate()
  const navigateToPrevious = () => {
    navigate(-1)
  }

  const formatETHAddress = (s:any, size:number) =>{
    var first = s.slice(0, size + 1);
    var last = s.slice(-size);
    return first + "..." + last;
  }

  const addressToDisplay = useMemo(()=>{
    if(nft?.minter) {
      return formatETHAddress(nft?.minter,3)
    } else {
      return "xxx"
    }
  },[nft])

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

  //! :::: TEST ::::
  // console.log("nft to display =>",nft, "id =>",id);
  // console.log("isFilled=>",isFilled);
  
  // const test =() =>{
  //   console.log("boooo");
    
  // }

  

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
            <p className="requestDetail__item__data__text">Minter : <strong>{addressToDisplay}</strong><ContentCopyIcon onClick={copyToClipboard}/></p>
            <p className="requestDetail__item__data__text">Fraction asked : <strong>{nft?.sharesQty.toString()}</strong></p>
            <p className="requestDetail__item__data__text">Token id : <strong>{nft?.nftId.toString()}</strong></p>
          </div>
          {props.isAdmin && nft?.status === 0 &&
          <div className='requestDetail__buttonPanel'>
            <h1 className="requestDetail__title">Additional information for minting</h1>
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Stocker' onChange={handleStockerChange} />
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Stocking Id' onChange={handleStockingIdChange} />
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Rarity (set to "unknow" if empty)' onChange={handleRarityChange} />
            <button className={`requestDetail__button requestDetail__button--big ${isFilled? "" : "requestDetail__button--disable"}`} onClick={validate} >
              ACCEPT
            </button>
            <button className="requestDetail__button requestDetail__button--big requestDetail__button--red">
              REFUSE
            </button>
          </div>
          }
          {isOwner && nft?.status === 1 &&
          <div className="requestDetail__buttonPanel">
            <button className="requestDetail__button requestDetail__button--big" onClick={mint} >
              MINT
            </button>
          </div>
          }
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