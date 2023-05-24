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
            <p>With Collector Chain, <strong>create, buy and sell digitalized and fractionated physical collectibles</strong> </p>
            <p><strong>Collect fractions</strong> of rare objets, <strong>securely stocked</strong> all over the world</p>
            <p>Value your collectibles, by make them available to <strong>a wordwide community of collectors</strong></p>
        </div>
        
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
                Get access to uncommon collectibles all over the world, and finely manage your investment. <strong>Buy and put on sell at any time</strong>,part or all of a collectible shares
            </div>
            <button><Link className='link' to='/create'>FRACTIONALIZE YOUR COLLECTIBLE</Link> </button>
        </div>
        <div className="home__title">
            WHY USE COLLECTOR CHAIN
        </div>
        <div className="home__text">
            <p>Collector Chain is a platform  which <strong>ease your collector hobby</strong> thanks to shares fractionalization.</p>
            <p>Moreover, by acquiring real shares of the object instead of the real object, <strong>collect is becoming more sustainable</strong> by avoiding new object production pressure</p>
            <p>Depending of your position, you will find specifics advantages :</p>
        </div>
        <div className="home__text">
        <strong>1- FOR PROFESSIONAL SELLERS</strong>  <br/>
        Create a new selling channel toward your customers
        </div>
        <div className="home__text">
        <strong>2- FOR INSTITUTIONS</strong>  <br/>
        Build and engage your community by sharing and valuing your physical assets with them
        </div>
        <div className="home__text">
        <strong>3- FOR COLLECTORS </strong> <br/>
        Increase your collection capacity thanks to frazionalization
        </div>
        <div className="home__text">
        <strong>4- FOR INVESTORS</strong>  <br/>
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