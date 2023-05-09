import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat"
require('dotenv').config()
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

console.log("goerli rpc url =>", GOERLI_RPC_URL);


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    // goerli: {
    //   url: GOERLI_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 5
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
      // accounts => fourni par hardhat
      chainId: 31337
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true
  }
};

export default config;
