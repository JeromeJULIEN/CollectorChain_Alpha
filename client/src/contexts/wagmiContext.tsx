import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ReactNode } from 'react'


// const infuraApiKey :string = process.env.INFURA_API_KEY
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY as string

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, goerli],
  [infuraProvider({ apiKey: infuraApiKey }), publicProvider()],
)
 
// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'Collector Chain',
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: 'df0aaab88585898beea80df991ef4153',
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
})


interface WagmiProviderProps {
    children : React.ReactNode
}

export const WagmiProvider = ({children} : WagmiProviderProps) =>{
    return <WagmiConfig client={client}>{children}</WagmiConfig>
}