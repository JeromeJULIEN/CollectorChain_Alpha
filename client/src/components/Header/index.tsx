import React, { useState,MouseEvent } from 'react'
import "./styles.scss"
import logo from "../../image/logo.png"
import { Menu,Login } from '@mui/icons-material'
import MenuApp from '../MenuApp'



const Header = () => {
  //! :::: LOCAL STATE ::::
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [loginVisibility, setLoginVisibility] = useState(false)

  //! :::: FUNCTIONS ::::
  const onMenuButtonClick = (e: MouseEvent)=>{
    setMenuVisibility(!menuVisibility)
    console.log("click");
    
  }

  const onLoginButtonClick = (e: MouseEvent)=>{
    setLoginVisibility(!loginVisibility)
    console.log("click");

  }

  return (
    <>
    <div className='header'>
       <div className="header__menu" onClick={onMenuButtonClick}>
        <Menu className="header__menu-button"/>
      </div>
      <div className="header__logo">
        <img className='header__logo-image' src={logo} alt="Logo" />
      </div>
      <div className="header__login" onClick={onLoginButtonClick}>
        <Login className="header__login-button"/>
      </div>
    </div>
    {menuVisibility && <MenuApp/>}
    </>
  )
}

export default Header