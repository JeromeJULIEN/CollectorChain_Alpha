import React from 'react'
import './styles.scss'
import logo from "../../image/logo.png"


type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='footer'>
        <div className="footer__logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="footer__text">
            <div>collector chain @2023</div>
            <div className="footer__text--link">
                <div>Contact us</div>
                <div>Create</div>
                <div>Our collection</div>
            </div>
        </div>

    </div>
  )
}

export default Footer