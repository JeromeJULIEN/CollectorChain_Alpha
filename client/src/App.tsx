import './App.css';
import "./components/Header/index"
import Header from './components/Header/index';
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HowItWorks from './components/HowItWorks';
import Create from './components/Create';
import { WagmiProvider } from './contexts/wagmiContext';  
import CollectorChain from "./contracts/CollectorChain/CollectorChain.json"
import { useContract, useProvider } from 'wagmi';
import contractAddress from "./contracts/CollectorChain/CollectorChain-address.json"
import Request from './components/Request';
import Admin from './components/Admin';



function App() {

   return (
    <Router>
    <div className="App">
        <WagmiProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/howitworks" element={<HowItWorks/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/request" element={<Request/>}/>
          <Route path="/admin" element={<Admin/>}/>

        </Routes>
        <Footer/>

        </WagmiProvider>
    </div>

    </Router>
  );
}

export default App;
