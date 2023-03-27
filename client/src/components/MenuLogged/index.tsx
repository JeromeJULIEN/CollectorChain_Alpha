import React from 'react'
import { Link } from 'react-router-dom'
import { useDisconnect } from 'wagmi'
import './styles.scss'

type Props = {}

const MenuLogged = (props: Props) => {

    const {disconnect} = useDisconnect()

  return (
    <div className='menuLogged'>
        {/* <button className='menuLogged__item' onClick={()=>disconnect()}>MY COLLECTION</button> */}
        <Link className='menuLogged__item' to="/request">MY REQUEST</Link>
        <button className='menuLogged__item' onClick={()=>disconnect()}>DISCONNECT</button>
    </div>
  )
}

export default MenuLogged