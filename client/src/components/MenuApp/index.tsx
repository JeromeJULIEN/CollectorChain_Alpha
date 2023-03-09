import React from 'react'
import './styles.scss'

type Props = {}

const MenuApp = (props: Props) => {
  return (
    <div className='menuApp'>
        <div className="menuApp__item">HOME</div>
        <div className="menuApp__item">HOW IT WORKS</div>
        <div className="menuApp__item">CREATE YOUR OBJECT</div>
        <div className="menuApp__item">COLLECTION</div>
    </div>
  )
}

export default MenuApp