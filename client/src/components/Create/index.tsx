import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'




const Create = () => {

  const { data : metadata, isError, isLoading } = useContractRead({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: contractABI.abi,
    functionName: 'contractURI',
  })

  useEffect(()=>{
    console.log("metadata=>",metadata)
  },[metadata])

  const { config : setContractURIConfig } = usePrepareContractWrite({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: contractABI.abi,
    functionName: 'setContractURI',
    args:["changement URI"]
  })
  const { data, isSuccess, write: setContractURIWrite } = useContractWrite(setContractURIConfig)

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
            <button className='create__button'>Select a file</button>
            <div className="create__title--center">Proof of ownership</div>
            <button className='create__button'>Select a file</button>
            <div className="create__title--center">Storage</div>
            <button className='create__button'>Select a storage</button>
            <div className="create__title--center">Number of Fractions</div>
            <button className='create__button'>Select a value</button>
            <button className='create__button create__button--big' onClick={() => setContractURIWrite?.()}>SUBMIT (...SOON)</button>
        </div>
    </div>
  )
}

export default Create