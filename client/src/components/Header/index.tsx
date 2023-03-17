import React, { useState,MouseEvent, useEffect } from 'react'
import "./styles.scss"
import logo from "../../image/logo_CC.png"
import { Menu,Login, Logout } from '@mui/icons-material'
import MenuApp from '../MenuApp'
import { Link, useLocation } from 'react-router-dom'
import MenuLogin from '../MenuLogin'
import MenuLogged from '../MenuLogged'
import { useAccount,  useConnect,  useDisconnect} from 'wagmi'
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'
import { ConnectButton } from '@rainbow-me/rainbowkit';



const Header = () => { 

  const { address, connector, isConnected } = useAccount()
  const {disconnect} = useDisconnect()


  const location = useLocation()

  useEffect(()=>{
    setMenuVisibility(false)
    setLoginVisibility(false)
    setLoggedVisibility(false)
    window.scrollTo(0,0)
  },[location,isConnected])

  //! :::: LOCAL STATE ::::
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [loginVisibility, setLoginVisibility] = useState(false)
  const [loggedVisibility, setLoggedVisibility] = useState(false)


  //! :::: FUNCTIONS ::::
  const onMenuButtonClick = (e: MouseEvent)=>{
    setMenuVisibility(!menuVisibility)
    setLoginVisibility(false)
    setLoggedVisibility(false)    
  }

  const onLoginButtonClick = (e: MouseEvent)=>{
    setLoginVisibility(!loginVisibility)
    setMenuVisibility(false)
  }

  const onLoggedButtonClick = (e: MouseEvent)=>{
    setLoggedVisibility(!loggedVisibility)
    setMenuVisibility(false)
  }


  return (
    <>
    <div className='header'>
       <div className="header__menu" onClick={onMenuButtonClick}>
        <Menu className="header__menu-button"/>
      </div>
      <div className="header__logo">
        <Link to='/'><img className='header__logo-image' src={logo} alt="Logo" /></Link>
        
      </div>
      <div className="header__login" onClick={onLoginButtonClick}>
       {!isConnected && <Login className="header__login-button"/> }
       {isConnected &&
       <div className='header__logged' onClick={onLoggedButtonClick}>
        <button className='header__logged-button'>
        <Jazzicon diameter={25} seed={jsNumberForAddress({address}.toString())} /> 

        </button>
       </div>
       }
      </div>
    </div>
    {menuVisibility && <MenuApp/>}
    {loginVisibility && <MenuLogin/>}
    {loggedVisibility && <MenuLogged/>}
    </>
  )
}

export default Header