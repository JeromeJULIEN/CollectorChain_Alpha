import React, { useEffect, useState } from 'react'
import "./styles.scss"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
            <div className='horizontalBox'>
              <button className='create__button'>Select a file</button>
              <div className='create__button__icon'><ArrowForwardIcon fontSize='large'/></div>
            </div>
            <div className="create__title--center">Proof of ownership</div>
            <div className='horizontalBox'>
              <button className='create__button'>Select a file</button>
              <div className='create__button__icon'><ArrowForwardIcon fontSize='large'/></div>
            </div>
            <div className="create__title--center">Proof of Storage</div>
            <div className='horizontalBox'>
              <button className='create__button'>Select a file</button>
              <div className='create__button__icon'><ArrowForwardIcon fontSize='large'/></div>
            </div>
            <div className="create__title--center">Number of Fractions</div>
            <div className="horizontalBox">
              <button className='create__button create__button--big'>Set a value</button>
            </div>
            <div className="create__title--center create__title--center--last">Submit your request</div>
            <div className="horizontalBox">
              <button className='create__button create__button--big'>
                SUBMIT (...SOON)
              </button>
            </div>
        </div>
    </div>
  )
}

export default Create