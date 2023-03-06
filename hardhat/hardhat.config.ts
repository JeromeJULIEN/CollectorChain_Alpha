import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
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
