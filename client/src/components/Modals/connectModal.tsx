import React from 'react'
import { Modal } from '@mui/material';
import "./styles.scss"
import { useConnect, useSwitchNetwork } from 'wagmi';


type Props = {
}

const ConnectModal = (props: Props) => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    const { connect, connectors} =  useConnect()
    const connector : any = connectors[0] // only metamask --> to change if needed

    console.log(":::::: connector =>", connector);
    

    return (
        <Modal
            className='connectModal'
            open={open}
            onClose={handleClose}
            style={{position: "absolute",
                    top: "40%",
                    left: "15%",
                    width: "70%",
                    height: "30%",
                    zIndex:"5"
                }}
        >
            <div className='connectModal__content'>
                <p>Not connected</p>
                <button className='connectModal__content__button' onClick={()=> connect?.({connector})}>CONNECT YOUR WALLET</button>
            </div>
        </Modal>
    )
}

export default ConnectModal