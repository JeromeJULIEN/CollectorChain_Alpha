import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { hardhat, arbitrum, goerli } from 'wagmi/chains'


import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ReactNode } from 'react'
import { getNetwork, JsonRpcProvider } from '@ethersproject/providers'


// const infuraApiKey :string = process.env.INFURA_API_KEY
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY as string

const { chains, provider } = configureChains(
  [hardhat, goerli],
  [/*infuraProvider({ apiKey: infuraApiKey }),*/ publicProvider()],
)

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new InjectedConnector({chains})
  ],
  provider
})


interface WagmiProviderProps {
    children : React.ReactNode
}

export const WagmiProvider = ({children} : WagmiProviderProps) =>{
    return <WagmiConfig client={client}>{children}</WagmiConfig>
}