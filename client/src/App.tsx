import './App.css';
import "./components/Header/index"
import Header from './components/Header/index';
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HowItWorks from './components/HowItWorks';
import Create from './components/Create';
import { useAccount, useContract, useContractRead, useProvider, useNetwork } from 'wagmi';
import Request from './components/Request';
import Admin from './components/Admin';
import contractAddress from "./contracts/CollectorChain/CollectorChain-address.json"
import contractABI from "./contracts/CollectorChain/CollectorChain.json"
import { useEffect, useMemo, useState } from 'react';
import RequestDetail from './components/RequestDetail';
import { ToastContainer } from 'react-toastify';
import { log } from 'console';

interface ContractAddress {
  [key: string]: string;
}

function App() {
  //! :::: LOCAL STATE ::::
  const [isAdmin,setIsAdmin] = useState(false)

  //! :::: WAGMI ::::
  const { address, isConnected } = useAccount()
  const {chain} = useNetwork()

  //!test
  const network : string | undefined = chain?.network
  const json : ContractAddress = contractAddress
  // console.log("json",json);
  
  //! par defaut, on indique le netwrok mumbai pour récupérer l'adresse
  // const contractAddr : any = !network ? json.mumbai : json[network]
  const contractAddr : any = json.mumbai
  // console.log("chain",chain,"chainId",network,"contractAddr", contractAddr);
  //! --- fin test

  // const contractAddressTyped : `0x${string}`= `0x${contractAddress.localhost.substring(2)}`
  const contractAddressTyped : `0x${string}`= `0x${contractAddr.substring(2)}`
  // console.log("contract address typed",contractAddressTyped, "chain", chain);
  

  

  const {data : owner} : {data? : string} = useContractRead({
    address : contractAddressTyped,
    abi:contractABI.abi,
    functionName:'owner'
  })

  const isGoodNetwork = useMemo(()=> {return chain?.id == process.env.REACT_APP_CHAIN_ID},[chain?.id])

  useEffect(()=>{
    if(address == owner) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    console.log("contract address =>", contractAddressTyped);
    console.log("connected address =>", address);
    console.log("contract owner address =>",owner);   
    console.log("network =>",chain);
    const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY as string
    console.log("infura API key =>", infuraApiKey);
    console.log("isGoodNetwork=>",isGoodNetwork, chain?.id, process.env.REACT_APP_CHAIN_ID);
     
  },[address,owner, chain])

  // useEffect(()=>{
  //   console.log("isAdmin =>",isAdmin);
    
  // },[isAdmin])

   return (
    <Router>
    <div className="App">
        <Header isConnected={isConnected} address={address} owner={owner}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/howitworks" element={<HowItWorks/>}/>
          <Route path="/create" element={<Create contractAddress={contractAddressTyped} address={address} isGoodNetwork={isGoodNetwork}/>}/>
          <Route path="/request" element={<Request contractAddress={contractAddressTyped} address={address} isGoodNetwork={isGoodNetwork}/>}/>
          <Route path="/admin" element={<Admin contractAddress={contractAddressTyped} isAdmin={isAdmin} isGoodNetwork={isGoodNetwork}/>}/>
          <Route path="/requestdetail/:id" element={<RequestDetail contractAddress={contractAddressTyped} address={address} isGoodNetwork={isGoodNetwork} isAdmin={isAdmin}/>}/>


        </Routes>
        <Footer/>
    </div>

    </Router>
  );
}

export default App;
