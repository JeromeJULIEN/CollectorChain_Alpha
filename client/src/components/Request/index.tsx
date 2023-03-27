import React, { useEffect, useState } from 'react'
import "./styles.scss"
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"
import { UseContractConfig, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'




const Request = () => {
  //! :::: LOCAL STATE ::::




  return (
    <div className='request'>
        <div className="request__title">
            YOUR OPENED REQUESTS STATUS
        </div>
        <div className="blueBackground">
           
        </div>
    </div>
  )
}

export default Request