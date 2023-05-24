import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import { useContractRead } from 'wagmi'
import useOnClickOutside from '../Hooks/useOnClickOutside'

interface MenuAppProps {
  owner? : string, 
  address? : `0x${string}` | undefined,
  isConnected?: boolean

}

const MenuApp = (props : MenuAppProps) => {
 
  //! :::: FUNCTIONS ::::
  const openLink = () =>{
    window.open(process.env.REACT_APP_COLLECTION_URL)
  }

  
  return (
    <div className='menuApp'>
      <Link className="menuApp__item" to="/">HOME</Link>
      <Link  className="menuApp__item" to="/howitworks">HOW IT WORKS</Link>
      <Link className="menuApp__item" to="/create">CREATE YOUR OBJECT</Link>
      <div className="menuApp__item" onClick={openLink}>COLLECTION</div>
      {props.isConnected && <Link className="menuApp__item" to="/request">MY REQUESTS</Link>}
      {/*props.owner == props.address && */props.isConnected && <Link className="menuApp__item" to="/admin">ADMIN</Link>}
    </div>
  )
}

export default MenuApp