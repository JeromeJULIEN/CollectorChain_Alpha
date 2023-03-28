import React, { useState,MouseEvent, useEffect } from 'react'
import "./styles.scss"
import logo from "../../image/logo_CC.png"
import { Menu,Login, Logout } from '@mui/icons-material'
import MenuApp from '../MenuApp'
import { Link, useLocation } from 'react-router-dom'
import MenuLogin from '../MenuLogin'
import MenuLogged from '../MenuLogged'
import { useAccount,  useConnect,  useContractRead,  useDisconnect} from 'wagmi'
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'
import { ConnectButton } from '@rainbow-me/rainbowkit';


interface HeaderProps {
  isConnected : boolean,
  address? : `0x${string}` | undefined,
  owner? : string
}

const Header = (props : HeaderProps) => { 

  
  const {disconnect} = useDisconnect()


  const location = useLocation()

  useEffect(()=>{
    setMenuVisibility(false)
    setLoginVisibility(false)
    setLoggedVisibility(false)
    window.scrollTo(0,0)
  },[location,props.isConnected])

  //! :::: LOCAL STATE ::::
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [loginVisibility, setLoginVisibility] = useState(false)
  const [loggedVisibility, setLoggedVisibility] = useState(false)
  const [formatedAddress,setFormatedAddress] = useState("")

   


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

  const formatETHAddress = (s:any, size:number) =>{;
    var first = s.slice(0, size + 1);
    var last = s.slice(-size);
    return first + "..." + last;
  }

  useEffect(()=>{
    if( props.isConnected){
      setFormatedAddress(formatETHAddress(props.address,3)) 
    }
  },[props.isConnected,props.address])


  return (
    <>
    <div className='header'>
       <div className="header__menu" onClick={onMenuButtonClick}>
        <Menu className="header__menu-button" />
      </div>
      <div className="header__logo">
        <Link to='/'><img className='header__logo-image' src={logo} alt="Logo" /></Link>
        
      </div>
      <div className="header__login" onClick={onLoginButtonClick}>
       {!props.isConnected && <Login className="header__login-button"/> }
       {props.isConnected &&
       <div className='header__logged' onClick={onLoggedButtonClick}>
        <button className='header__logged-button'>
        {props.address != undefined && <>
          {formatedAddress}
          <Jazzicon diameter={25} seed={jsNumberForAddress(props.address.toString())} /> 
        </>}

        </button>
       </div>
       }
      </div>
    </div>
    {menuVisibility && <MenuApp owner={props.owner} address={props.address}/>}
    {loginVisibility && <MenuLogin/>}
    {loggedVisibility && <MenuLogged/>}
    </>
  )
}

export default Header