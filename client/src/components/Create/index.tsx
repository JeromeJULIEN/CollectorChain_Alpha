import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'




const Create = () => {
  

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
            <div className="create__title--center">Proof of Storage</div>
            <button className='create__button'>Select a file</button>
            <div className="create__title--center">Number of Fractions</div>
            <button className='create__button'>Set a value</button>
            <button className='create__button create__button--big'>
              SUBMIT (...SOON)
            </button>
        </div>
    </div>
  )
}

export default Create