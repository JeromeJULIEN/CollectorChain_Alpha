import React, { useEffect, useState } from 'react'
import "./styles.scss"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { handleSubmission } from '../Utils/FileUpload';
import { Blocks } from 'react-loader-spinner';

import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'




const Create = () => {
  
  
  //! :::: LOCAL STATE ::::
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
  // WAGMI hook
  const {isConnected } = useAccount()
  
  
  //! :::: FUNCTIONS ::::
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
    setObjectPictureLoader(true)
    const hash = await handleSubmission(objectPicture)
    setObjectPictureHash(hash)
    setObjectPictureLoader(false)
  }
  const handleAuthPictureSubmission = async() =>{
    setAuthPictureLoader(true)
    const hash = await handleSubmission(authPicture)
    setAuthPictureHash(hash)
    setAuthPictureLoader(false)
  }
  const handleStoragePictureSubmission = async() =>{
    setStoragePictureLoader(true)
    const hash = await handleSubmission(storagePicture)
    setStoragePictureHash(hash)
    setStoragePictureLoader(false)
  }
  
  //! :::: TEST ::::
  // useEffect(()=>{
  //   console.log("hashObject =>",objectPictureHash);
  //   console.log("hashAuth =>",authPictureHash);
  //   console.log("hashStorage =>",storagePictureHash);
    
  // },[objectPictureHash,authPictureHash,storagePictureHash])
  
  return (
    <div className='create'>
        <div className="create__title">
            SUBMIT YOUR OBJECT (...SOON)
        </div>
        <div className="create__text">
        Please provide the requested informations 
        </div>
        <div className="blueBackground">
            <div className="create__title--center">Picture of the object </div>
            <div className='horizontalBox'>
              {/* use label to hide input element and keep the functionality */}
              <label className="create__button" > 
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
                wrapperClass="blocks-wrapper"
              /> :
              <div className='create__button__icon' onClick={()=>handleObjectPictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Proof of ownership</div>
            <div className='horizontalBox'>
              <label className="create__button">
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
                wrapperClass="blocks-wrapper"
              /> :
              <div className='create__button__icon' onClick={()=>handleAuthPictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Proof of Storage</div>
            <div className='horizontalBox'>
              <label className="create__button">
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
                wrapperClass="blocks-wrapper"
              /> :
              <div className='create__button__icon' onClick={()=>handleStoragePictureSubmission()}><ArrowForwardIcon fontSize='large'/></div>
              :
              <div className='create__button__icon create__button__icon--done' ><CheckIcon fontSize='large'/></div>
              }
            </div>
            <div className="create__title--center">Number of Fractions</div>
            <div className="horizontalBox">
              <input type="text" className='create__button create__button--big' placeholder='set a value'/>
            </div>
            <div className="create__title--center create__title--center--last">Submit your request</div>
            <div className="horizontalBox">
              {isConnected ? 
              <button className='create__button create__button--big'>SUBMIT (...SOON)</button>
              :
              <button className='create__button create__button--big' disabled={true}>CONNECT YOUR ACCOUNT</button>
              }
            </div>
        </div>
    </div>
  )
}

export default Create