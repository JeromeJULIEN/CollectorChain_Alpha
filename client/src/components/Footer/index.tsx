import React from 'react'
import './styles.scss'
import logo from "../../image/logo_CC.png"
import { Link } from 'react-router-dom'


type Props = {}

const Footer = (props: Props) => {
  const openLink = () =>{
    window.open("https://testnets.opensea.io/collection/collector-chain-beta")
  }

  const openMail =() =>{
    window.open("mailto:jejulien@gmail.com", "_blank")
  }

  return (
    <div className='footer'>
        <div className="footer__logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="footer__text">
            <div>collector chain @2023</div>
            <div className="footer__text--link">
                <div onClick={openMail}>Contact us</div>
                <Link className='link' to="/create">Create</Link>
                <div onClick={openLink}>Our collection</div>
            </div>
        </div>

    </div>
  )
}

export default Footer