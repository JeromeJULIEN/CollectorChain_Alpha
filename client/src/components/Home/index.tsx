import React from 'react'
import './styles.scss'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import Typewriter from "typewriter-effect"
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandIcon from '@mui/icons-material/Expand';
import ShuffleIcon from '@mui/icons-material/Shuffle';

type Props = {}

const Home = (props: Props) => {
    const openLink = () =>{
        window.open(process.env.REACT_APP_COLLECTION_URL)
        }
        

  return (
    <div className='home'>
        <div className="home__title">
            <p>MAKE YOUR COLLECTIBLES MORE <br/>

            <p className='home__title--blue'>
                <Typewriter
                    onInit={(typewriter)=> {
                        typewriter
                        .typeString("LIQUIDS")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("VALUABLES")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("SUSTAINABLES")
                        .pauseFor(2000)
                        .deleteAll()
                        .start()
                    }} 
                    options={{
                        loop:true,
                        delay:80,
                        deleteSpeed:60,
                        cursor:"."
                        
                    }}  
                    />
            </p>
            </p>
            {/* MAKE YOUR REAL ASSETS LIQUIDS */}
        </div>
        <div className="home__text">
            <p className="home__text--big">With Collector Chain, <strong>create, buy and sell digitalized and fractionated physical collectibles</strong> </p>
            <p><strong>Collect fractions</strong> of rare objets, <strong>securely stored</strong> all over the world</p>
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
                Get access to uncommon collectibles all over the world, and finely manage your investment. <strong>Buy and put on sell at any time</strong>,part or all of a collectible's shares
            </div>
            <button className="blueBackground__button"><Link className='link' to='/create'>FRACTIONALIZE YOUR COLLECTIBLE</Link> </button>
        </div>
        <div className="home__title">
            WHY USE COLLECTOR CHAIN ?
        </div>
        <div className="home__text">
            <p className="home__text--big">Collector Chain is a platform  which <strong>ease your collector hobby</strong> thanks to shares fractionalization</p>
            <p>Moreover, by acquiring real ownership shares of the object instead of the real object, <strong>collect is becoming more sustainable</strong> by avoiding new object production pressure</p>
            <p>Depending of your position in the collectible market, you will find specifics advantages :</p>
        </div>
        <div className="home__text">
            <strong>1- FOR PROFESSIONAL SELLERS</strong>
        </div>
        <div className='home__text home__text--withIcon'>
            <CenterFocusStrongIcon sx={{verticalAlign:'middle', color:'#4aadff', fontSize:"3rem"}}/> 
            <p>Create a new selling channel toward your customers</p>
        </div>
        <div className="home__text">
        <strong>2- FOR INSTITUTIONS</strong>
        </div>
        <div className='home__text home__text--withIcon'>
            <GroupsIcon sx={{verticalAlign:'middle', color:'#4aadff', fontSize:"3rem"}}/>
            <p>Build and engage your community by sharing and valuing your physical assets with them </p> 
        </div>
        <div className="home__text">
            <strong>3- FOR COLLECTORS </strong>
        </div>
        <div className='home__text home__text--withIcon'>
            <ExpandIcon sx={{verticalAlign:'middle', color:'#4aadff', fontSize:"3rem"}}/>
            <p>Increase your collection capacity thanks to fractionalization </p>
        </div>
        <div className="home__text">
            <strong>4- FOR INVESTORS</strong>
        </div>
        <div className='home__text home__text--withIcon'>
            <ShuffleIcon sx={{verticalAlign:'middle', color:'#4aadff', fontSize:"3rem"}}/>
            <p>  Get flexibility in your portfolio management </p>
        </div>
        <div className="blueBackground">
             <div className="home__title--rightAlign">
                <br/>OUR COLLECTION
            </div>
            <div className="home__text--rightAlign">
            Visit our collection to buy your first ownership shares
            </div>
            <button className="blueBackground__button" onClick={openLink}>VISIT OUR COLLECTION</button>
        </div>


    </div>
  )
}

export default Home