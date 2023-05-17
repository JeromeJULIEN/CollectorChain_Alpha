import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useContractRead, usePrepareContractWrite,useContractWrite } from 'wagmi';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { Modal, imageListClasses } from '@mui/material';
import { wait } from '../Utils/wait';
import { Blocks } from 'react-loader-spinner';
import { jsonUpload } from '../Utils/jsonUpload';
import generateMetadata from '../Utils/generateMetadata';
import openseaLogo from "../../image/openSea_logo.png"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ConnectModal from '../Modals/connectModal';
import SwitchNetworkModal from '../Modals/switchNetworkModal';



interface requestDetailProps {
  contractAddress? : `0x${string}`,
  address? : `0x${string}`,
  isGoodNetwork? : boolean,
  isAdmin? : boolean,
  isConnected? : boolean
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
  const [isValidateLoading,setIsValidateLoading] = useState<boolean>(false)
  const [isRefuseLoading,setIsRefuseLoading] = useState<boolean>(false)
  const [tokenURI,setTokenURI] = useState<string>()
  const [stocker,setStocker] = useState<string>()
  const [stockingId,setStockingId] = useState<string>()
  const [rarity,setRarity] = useState<number>()
  const [statusChange,setStatusChange] = useState(false)


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
    watch:true, // to update the nft status when using "validate", "refuse", and "mint"
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

  const{writeAsync : validationWrite} = useContractWrite(validationConfig)

  const validate = async() =>{
    setIsValidateLoading(true)
    try{
      const tx : any= await validationWrite?.()
      const res = await tx?.wait()
    } catch(error){
      console.error(error);
      toast.error("Something when wrong during the transaction...")
    } finally {
      setStatusChange(!statusChange)
      setIsValidateLoading(false)
    }
  }

  // REQUEST REFUSE MINT
  const {config : refuseConfig} = usePrepareContractWrite({
    address : props.contractAddress,
    abi: contractABI.abi,
    functionName: "setMintProposalStatus",
    args: [false,id],
    onSuccess(data){
      console.log('succes refuseConfig', data);
    },
    onError(data){
      console.error('error refuseConfig',data);
      
    }
  })

  const{writeAsync : refuseWrite} = useContractWrite(refuseConfig)

  const refuse = async() =>{
    setIsRefuseLoading(true)
    try{
      const tx : any= await refuseWrite?.()
      const res = await tx?.wait()
    } catch(error){
      console.error(error);
      toast.error("Something when wrong during the transaction...")
    } finally {
      setStatusChange(!statusChange)
      setIsRefuseLoading(false)
    }
  }

  // REQUEST MINT
  const {config : mintConfig} = usePrepareContractWrite({
    address : props.contractAddress,
    abi : contractABI.abi,
    functionName : "mintNft",
    args:[id,tokenURI],
    onError(data){
      console.error('error mintConfig',data);      
    }
  })
  
  const {writeAsync : mintWrite} = useContractWrite(mintConfig)
  
  // Process : 1 - JSON Metadata creation / 2 - pin JSON to IPFS / 3 - mint with metadata ipfsHash
  const generateTokenURI = async() => {  
    setIsMintLoading(true);
    const metadata = await generateMetadata(
      nft?.nftName,
      nft?.sharesQty,
      nft?.objectImageURL,
      nft?.authImageURL,
      nft?.storageImageURL,
      stocker,
      stockingId,
      rarity
    )    
    const tokenURIHash : string = await jsonUpload(metadata,nft?.nftId,nft?.nftName)
    setTokenURI(`https://ipfs.io/ipfs/${tokenURIHash}`)
    setIsMintLoading(false);
    toast.success("Data succesfully stored, object is ready for mint", {autoClose:2000})
  }

  const mint = async() =>{
    setIsMintLoading(true);
    console.log("token URI =>", tokenURI);
    if (!tokenURI) {
      toast.error("Something when with the item metadata...")
      return
    }
    try {
      const tx : any = await mintWrite?.()
      const res = await tx?.wait()
      toast.success(`Great job!, ${nft?.nftName} property is now split in ${nft?.sharesQty} fractions`)
    } catch(error){
      console.error(error);
      toast.error("Something when wrong during the transaction...")
    } finally {
      setIsMintLoading(false);
    }
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

  useEffect(()=>{
    console.log("status changed", statusChange);
  },[statusChange])

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

  const openNftLink = () => (
    window.open(`https://testnets.opensea.io/assets/mumbai/0x0f36e01b1b0acf17718383e7fe2e873be7b706ec/${id}`)
  )

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
        {!props.isConnected && <ConnectModal/>}
        {!props.isGoodNetwork && props.isConnected && <SwitchNetworkModal/>}
        <h1 className='requestDetail__title'>{nft?.nftName} <button className='navigateToPrevious' onClick={navigateToPrevious}><HighlightOffIcon fontSize='large'/></button></h1>
        <h2 className="requestDetail__status">
          {nft?.status === 0 && <p className="requestDetail__status--orange"> pending</p>}
          {nft?.status === 1 && <p className="requestDetail__status--green"> accepted</p>}
          {nft?.status === 2 && <p className="requestDetail__status--red"> refused</p>}
          {nft?.status === 3 && <p className="requestDetail__status--blue"> Created</p>}
          {nft?.status === 3 && <img className="requestDetail__status__image" src={openseaLogo} alt='opensea logo' onClick={openNftLink}></img>}
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
            {isValidateLoading ? 
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper-requestDetail"
            /> 
            :
            <button className="requestDetail__button requestDetail__button--big" onClick={validate} >
            ACCEPT
            </button>}
            {isRefuseLoading ?<Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper-requestDetail--refuse"
            />
            :
            <button className="requestDetail__button requestDetail__button--big requestDetail__button--red" onClick={refuse}>
            REFUSE
            </button>}
          </div>
          }
          {props.isAdmin && nft?.status === 1 &&
          <div className="requestDetail__buttonPanel">
            <h1 className="requestDetail__title">Additional information for minting</h1>
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Stocker' onChange={handleStockerChange} />
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Stocking Id' onChange={handleStockingIdChange} />
            <input type="text" className='requestDetail__button requestDetail__button--big requestDetail__button--darkBlue' placeholder='Rarity ("unknow" if empty)' onChange={handleRarityChange} />
            {isMintLoading ? <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper-requestDetail"
            />
            : tokenURI ? 
            <button className="requestDetail__button requestDetail__button--big" onClick={mint} >
            MINT
            </button>
            :
            <button className={`requestDetail__button requestDetail__button--big ${isFilled? "" : "requestDetail__button--disable"}`} onClick={generateTokenURI} >
            VALIDATE DATA
            </button>
            }
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