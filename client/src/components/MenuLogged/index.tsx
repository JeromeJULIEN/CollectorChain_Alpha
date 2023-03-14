import React from 'react'
import { useDisconnect } from 'wagmi'
import './styles.scss'

type Props = {}

const MenuLogged = (props: Props) => {

    const {disconnect} = useDisconnect()

  return (
    <div className='menuLogged'>
        <button className='menuLogged__item' onClick={()=>disconnect()}>DISCONNECT</button>
    </div>
  )
}

export default MenuLogged