import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

type Props = {}

const MenuApp = (props: Props) => {

  const openLink = () =>{
    window.open("https://opensea.io/")
  }

  return (
    <div className='menuApp'>
        <Link className="menuApp__item" to="/">HOME</Link>
        <Link  className="menuApp__item" to="/howitworks">HOW IT WORKS</Link>
        <Link className="menuApp__item" to="/create">CREATE YOUR OBJECT</Link>
        <div className="menuApp__item" onClick={openLink}>COLLECTION</div>
    </div>
  )
}

export default MenuApp