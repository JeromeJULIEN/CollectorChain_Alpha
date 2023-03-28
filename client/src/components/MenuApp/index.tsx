import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import { useContractRead } from 'wagmi'

interface MenuAppProps {owner? : string, address? : `0x${string}` | undefined}

const MenuApp = (props : MenuAppProps) => {
 
  //! :::: FUNCTIONS ::::
  const openLink = () =>{
    window.open("https://testnets.opensea.io/collection/collector-chain-beta")
  }

  return (
    <div className='menuApp'>
        <Link className="menuApp__item" to="/">HOME</Link>
        <Link  className="menuApp__item" to="/howitworks">HOW IT WORKS</Link>
        <Link className="menuApp__item" to="/create">CREATE YOUR OBJECT (...SOON)</Link>
        <div className="menuApp__item" onClick={openLink}>COLLECTION</div>
        {props.owner == props.address && <Link className="menuApp__item" to="/admin">ADMIN</Link>}
    </div>
  )
}

export default MenuApp