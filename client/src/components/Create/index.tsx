import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import "./styles.scss"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"

const contractAddr :any = contractAddress.CollectorChain 
const ABI : any = contractABI.abi

// const contractConfig : UseContractConfig ={
//   address : "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//   abi : ABI
// }


const Create = () => {
    const { data: metaData } = useContractRead({
      address : contractAddr,
      abi: ABI,
      functionName: 'getMetaData'
    })

  const {isConnected} = useAccount()
  const {connectors : dataFromUseConnect} = useConnect()
  

  const [datas,setDatas] = useState<any>()

  useEffect(()=>{
    (async()=>{
    
          console.log("data=>",metaData);
          setDatas(metaData)
          
    

      
      
    })()
  })

  
  


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
            <button className='create__button create__button--big' >SUBMIT</button>
        </div>
    </div>
  )
}

export default Create