import React from 'react'
import './styles.scss'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { toast } from 'react-toastify'

type Props = {}

const Home = (props: Props) => {
    const openLink = () =>{
        window.open(process.env.REACT_APP_COLLECTION_URL)
        }
        

  return (
    <div className='home'>
        <div className="home__title">
            MAKE YOUR REAL ASSETS LIQUIDS
        </div>
        <div className="home__text">
            With Collector Chain, create buy and sell digitalized and fractionated physical collectibles 
            {/* {address} */}
        </div>
        {/* <button onClick={()=>connect()}>connect</button>
        <button onClick={()=>disconnect()}>disconnect</button> */}
        <div className="home__image">
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
            <div className="home__image-item"></div>
        {/* <img src={imgCoin} alt="coin_img" /> */}
        </div>
        <div className="blueBackground">
            <div className="home__title--rightAlign">
                <br/>EASY TO USE
            </div>
            <div className="home__text--rightAlign">
                Get access to uncommon collectibles all over the world, and finely manage your investment. Buy and put on sell at any time,part or all of a collectible shares
            </div>
            <button><Link className='link' to='/create'>MINT YOUR ASSET</Link> </button>
        </div>
        <div className="home__title">
            WHY USE COLLECTOR CHAIN
        </div>
        <div className="home__text">
        <strong>1- FOR PROFESSIONAL SELLERS</strong>  <br/>
        Add a new way to address your customers
        </div>
        <div className="home__text">
        <strong>2- FOR COLLECTORS </strong> <br/>
        Increase your collection capacity thanks to frazionalization
        </div>
        <div className="home__text">
        <strong>3- FOR INVESTORS</strong>  <br/>
        Get flexibility in your portfolio management
        </div>
        <div className="blueBackground">
             <div className="home__title--rightAlign">
                <br/>OUR COLLECTIONS
            </div>
            <div className="home__text--rightAlign">
            Visit our opensea collection to buy your first shares
            </div>
            <button onClick={openLink}>VISIT OUR COLLECTION</button>
        </div>


    </div>
  )
}

export default Home