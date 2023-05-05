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
import { useEffect, useState } from 'react';
import RequestDetail from './components/RequestDetail';
import { ToastContainer } from 'react-toastify';



function App() {
  //! :::: LOCAL STATE ::::
  const [isAdmin,setIsAdmin] = useState(false)

  //! :::: WAGMI ::::
  const { address, isConnected } = useAccount()
  const {chain} = useNetwork()

  const contractAddressTyped : `0x${string}`= `0x${contractAddress.CollectorChain.substring(2)}`

   const {data : owner} : {data? : string} = useContractRead({
    address : contractAddressTyped,
    abi:contractABI.abi,
    functionName:'owner'
  })

  useEffect(()=>{
    if(address == owner) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    // console.log("contract address =>", addressTyped);
    // console.log("connected address =>", address);
    console.log("contract owner address =>",owner);   
    console.log("network =>",chain);
    const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY as string
    console.log("infura API key =>", infuraApiKey);


     
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
          <Route path="/create" element={<Create contractAddress={contractAddressTyped} address={address}/>}/>
          <Route path="/request" element={<Request/>}/>
          <Route path="/admin" element={<Admin contractAddress={contractAddressTyped} isAdmin={isAdmin}/>}/>
          <Route path="/requestdetail/:id" element={<RequestDetail/>}/>


        </Routes>
        <Footer/>
    </div>

    </Router>
  );
}

export default App;
