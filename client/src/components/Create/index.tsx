import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'




const Create = () => {
  //! :::: LOCAL STATE ::::
  const [setContractURILoading,setSetContractURILoading]= useState<boolean>()
  const [text,setText] = useState<string>()

  const handleChange = (event : React.FormEvent<HTMLInputElement>)=>{
    setText(event.currentTarget.value);
    
  }

  //! :::: TEST WAGMI ::::
  const { data : metadata, isError } = useContractRead({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: contractABI.abi,
    functionName: 'contractURI',
  })

  
  const { config : setContractURIConfig } = usePrepareContractWrite({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: contractABI.abi,
    functionName: 'setContractURI',
    args:[text]
  })
  const { data, isSuccess, isLoading, writeAsync: setContractURIWrite } = useContractWrite(setContractURIConfig)
  
  const setContractURICall = async()=>{
    console.log("text from state=>",text);
    
    setSetContractURILoading(true)
    try {
      const tx = await setContractURIWrite?.();
      const res = await tx?.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setSetContractURILoading(false);
    }
  }

  //! :::: CHECK ::::
  useEffect(()=>{
    console.log("metadata=>",metadata)
  },[metadata])

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
            <input className='create__button' type="text" placeholder='type a text' onChange={handleChange} value={text}></input>
            <button disabled={setContractURILoading} className='create__button create__button--big' onClick={setContractURICall}>
              {setContractURILoading ? <>IN PROGRESS...</> : <>SUBMIT (...SOON)</>}
              </button>
        </div>
    </div>
  )
}

export default Create