import React, { useEffect, useMemo, useState } from 'react'
import "./styles.scss"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { handleSubmission } from '../Utils/FileUpload';
import { Blocks } from 'react-loader-spinner';
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite, useAccount, useConnect } from 'wagmi'
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import SwitchNetworkModal from '../Modals/switchNetworkModal';
import ConnectModal from '../Modals/connectModal';


interface CreateProps {
  contractAddress? : `0x${string}`,
  address? : `0x${string}`,
  isGoodNetwork? : boolean,
  isConnected? : boolean
}

const Create = (props : CreateProps) => {
  
  
  //! :::: LOCAL STATE ::::
  // Object name and shares qty
  const [objectName,setObjectName] = useState("")
  const [sharesQty,setSharesQty] = useState(0)
  // path to file
  const [objectPicture,setObjectPicture] = useState<string>("")
  const [authPicture,setAuthPicture] = useState<string>("")
  const [storagePicture,setStoragePicture] = useState<string>("")
  // ipfs hash
  const [objectPictureHash,setObjectPictureHash] = useState<string>("")
  const [authPictureHash,setAuthPictureHash] = useState<string>("")
  const [storagePictureHash,setStoragePictureHash] = useState<string>("")
  // name to display
  const [objectPictureName,setObjectPictureName] = useState<string>("")
  const [authPictureName,setAuthPictureName] = useState<string>("")
  const [storagePictureName,setStoragePictureName] = useState<string>("")
  //loader
  const [objectPictureLoader,setObjectPictureLoader] = useState<boolean>(false)
  const [authPictureLoader,setAuthPictureLoader] = useState<boolean>(false)
  const [storagePictureLoader,setStoragePictureLoader] = useState<boolean>(false)
  const [mintPorposalCallLoader, setMintProposalCallLoader] = useState<boolean>(false)
  // submission status
  const [isSubmit,setIsSubmit] = useState<boolean>(false)
  

  const isFilled = useMemo(()=> {
    if (objectName && sharesQty && objectPictureHash && authPictureHash && storagePictureHash){
      return true
    } else {
      return false
    }
  },[objectName,sharesQty,objectPictureHash,authPictureHash,storagePictureHash])
  
  
  //! :::: FUNCTIONS ::::
  // Functions to handle object data
  const handleNameChange = (event : any) => {
    setObjectName(event.target.value)
  }
  const handleSharesQtyChange = (event : any) => {
    setSharesQty(event.target.value)
  }
  // Function to handle local state for display purpose
  const handleObjectPicture = (event:any) =>{
    setObjectPicture(event.target.files[0])
    setObjectPictureName(event.target.files[0].name)
    console.log(event.target.files[0].name);
  }
  const handleAuthPicture = (event:any) =>{
    setAuthPicture(event.target.files[0])
    setAuthPictureName(event.target.files[0].name)
    console.log(event.target.files[0]);
  }
  const handleStoragePicture = (event:any) =>{
    setStoragePicture(event.target.files[0])
    setStoragePictureName(event.target.files[0].name)
    console.log(event.target.files[0]);
  }

  // function to handle ipfs uploas through "FileUpload" component
  const handleObjectPictureSubmission = async() =>{
    if (!objectPicture) {
      toast.error("please, select a file",{autoClose:2000})
      return
    }
    setObjectPictureLoader(true)
    const hash = await handleSubmission(objectPicture)
    setObjectPictureHash(hash)
    setObjectPictureLoader(false)
  }
  const handleAuthPictureSubmission = async() =>{
    if (!authPicture) {
      toast.error("please, select a file",{autoClose:2000})
      return
    }
    setAuthPictureLoader(true)
    const hash = await handleSubmission(authPicture)
    setAuthPictureHash(hash)
    setAuthPictureLoader(false)
  }
  const handleStoragePictureSubmission = async() =>{
    if (!storagePicture) {
      toast.error("please, select a file",{autoClose:2000})
      return
    }
    setStoragePictureLoader(true)
    const hash = await handleSubmission(storagePicture)
    setStoragePictureHash(hash)
    setStoragePictureLoader(false)
  }

  //! :::: WAGMI ::::
  const { connect, connectors, error, pendingConnector } =
    useConnect()

  console.log("connectors=>",connectors);
  
  // mint proposal call configuration
  const {config : mintProposalCallConfig} = usePrepareContractWrite({
    address : props.contractAddress,
    abi : contractABI.abi,
    functionName: "createMintProposal",
    args:[
      objectName,
      objectPictureHash,
      authPictureHash,
      storagePictureHash,
      sharesQty
    ]
  })
  // mint proposal call
  const {data, isSuccess, isLoading, writeAsync : mintProposalCallWrite} = useContractWrite({
    ...mintProposalCallConfig,
    onError(){
      toast.error("Something went wrong...")
    },
    onSuccess(){
      console.log("mint done with args =>", {objectName,objectPictureHash,authPictureHash,storagePictureHash,sharesQty});
    }
  })


  const mintProposalCall = async()=>{
    if (!props.isGoodNetwork) {
      toast.error("Change network to mint")
      return
    }
    // handle lack of information
    if (!isFilled) {
      toast.error("please fill all the informations")
      return
    }
    // handle bad shares qty
    if(sharesQty < 1 || sharesQty > 100) {
      toast.error("Fraction has to be set between 1 and 100")
      return
    }
    setMintProposalCallLoader(true)
    try{
      const tx = await mintProposalCallWrite?.();
      const res = await tx?.wait()

    } catch (error) {
      console.error(error);
    } finally {
      toast.success("🎉 your request has been sent to our team. Follow up in your Request status page !!!")
      setIsSubmit(true)
      setMintProposalCallLoader(false)
      
    }
    
  }
  
  //! :::: TEST ::::
  // useEffect(()=>{
  //   console.log("hashObject =>",objectPictureHash);
  //   console.log("hashAuth =>",authPictureHash);
  //   console.log("hashStorage =>",storagePictureHash);
    
  // },[objectPictureHash,authPictureHash,storagePictureHash])
  console.log("isFilled=>",isFilled);
  
  
  return (
    <div className='create'>
        {!props.isConnected && <ConnectModal/>}
        {!props.isGoodNetwork && props.isConnected && <SwitchNetworkModal/>}
        <div className="create__title">
            SUBMIT YOUR OBJECT
        </div>
        <div className="create__text">
        Please provide all the requested informations 
        </div>
        <div className="blueBackground">
            <div className="create__title--center">Name of your object</div>
            <div className="horizontalBox">
              <input type="text" className='create__button create__button--big create__button--darkBlue' placeholder='Set a name' onChange={handleNameChange} />
            </div>
            <div className="create__title--center">Picture of the object </div>
            <div className='horizontalBox'>
              {/* use label to hide input element and keep the functionality */}
              <label className="create__button create__button--darkBlue" > 
                {objectPictureName==="" ? <>Select a file</> : <>{objectPictureName}</>}
                <input type="file" onChange={handleObjectPicture} disabled={objectPictureHash!==""}/>
              </label>
              {objectPictureHash==="" ? 
              objectPictureLoader ? <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper-create"
              /> :
              <div className='create__button__icon' onClick={()=>handleObjectPictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Proof of authenticity</div>
            <div className='horizontalBox'>
              <label className="create__button create__button--darkBlue">
              {authPictureName==="" ? <>Select a file</> : <>{authPictureName}</>}
                <input type="file" onChange={handleAuthPicture} disabled={authPictureHash!==""}/>
              </label>
              {authPictureHash==="" ? 
              authPictureLoader ? <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper-create"
              /> :
              <div className='create__button__icon' onClick={()=>handleAuthPictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Proof of Storage</div>
            <div className='horizontalBox'>
              <label className="create__button create__button--darkBlue">
                {storagePictureName==="" ? <>Select a file</> : <>{storagePictureName}</>}
                <input type="file" onChange={handleStoragePicture}/>
              </label>
              {storagePictureHash==="" ?
              storagePictureLoader ?<Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper-create"
              /> :
              <div className='create__button__icon' onClick={()=>handleStoragePictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Number of Fractions</div>
            <div className="horizontalBox">
              <input type="text" className='create__button create__button--big create__button--darkBlue' placeholder='set a value' onChange={handleSharesQtyChange}/>
            </div>
            <div className="create__title--center create__title--center--last">Submit your request</div>
            <div className="horizontalBox">
              {props.isConnected ? mintPorposalCallLoader ?
              <button className="create__button create__button--big"  onClick={mintProposalCall}><Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper-create"
            /> </button>
              : isSubmit ?
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              :
              <button className={`create__button create__button--big ${isFilled && props.isGoodNetwork? "":"create__button--disable"}`} onClick={mintProposalCall}>
                {props.isGoodNetwork? "SUBMIT" : "CHANGE NETWORK"}
              </button>
              :
              <button className='create__button create__button--big create__button--darkBlue' disabled={true} >CONNECT YOUR ACCOUNT</button>
              }
            </div>
        </div>
    </div>
  )
}

export default Create