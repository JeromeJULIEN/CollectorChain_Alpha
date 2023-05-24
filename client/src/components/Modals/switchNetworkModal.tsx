import React from 'react'
import { Modal } from '@mui/material';
import "./styles.scss"
import { useSwitchNetwork } from 'wagmi';


type Props = {
}

const SwitchNetworkModal = (props: Props) => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    const {switchNetwork} = useSwitchNetwork()
    const chainId : number | undefined = Number(process.env.REACT_APP_CHAIN_ID) 


    return (
            <Modal
                className='switchNetworkModal'
                open={open}
                onClose={handleClose}
                style={{position: "absolute",
                    top: "40%",
                    left: "15%",
                    width: "70%",
                    height: "30%",
                    outline: "0",
                    zIndex:"5"
                }}
            >
                <div className='switchNetworkModal__content'>
                    <p>Wrong network</p>
                    <button className='switchNetworkModal__content__button' onClick={()=> switchNetwork?.(chainId)}>SWITCH TO MUMBAI</button>
                </div>
            </Modal>
    )
}

export default SwitchNetworkModal