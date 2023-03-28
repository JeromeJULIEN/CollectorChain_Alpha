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
import contractAddress from "../../contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "../../contracts/CollectorChain/CollectorChain.json"



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
  const [formatedAddress,setFormatedAddress] = useState("")

   //! :::: WAGMI ::::
  const addressTyped : `0x${string}`= `0x${contractAddress.CollectorChain.substring(2)}`

   const {data : owner} : {data? : string} = useContractRead({
    address : addressTyped,
    abi:contractABI.abi,
    functionName:'owner'
  })

  useEffect(()=>{
    console.log("contract address =>", addressTyped);
    console.log("connected address =>", address);
    console.log("contract owner address =>",owner);
    
    
    
  })


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
    if( isConnected){
      setFormatedAddress(formatETHAddress(address,3)) 
    }
  },[isConnected,address])


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
       {!isConnected && <Login className="header__login-button"/> }
       {isConnected &&
       <div className='header__logged' onClick={onLoggedButtonClick}>
        <button className='header__logged-button'>
        {formatedAddress}
        <Jazzicon diameter={25} seed={jsNumberForAddress({address}.toString())} /> 

        </button>
       </div>
       }
      </div>
    </div>
    {menuVisibility && <MenuApp owner={owner} address={address}/>}
    {loginVisibility && <MenuLogin/>}
    {loggedVisibility && <MenuLogged/>}
    </>
  )
}

export default Header