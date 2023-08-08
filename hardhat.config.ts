// require("@nomicfoundation/hardhat-toolbox");
// // require("@nomiclabs/hardhat-waffle");
// // require("@nomicfoundation/hardhat-chai-matchers");
// // require("@nomiclabs/hardhat-ethers");

// // /** @type import('hardhat/config').HardhatUserConfig */
// // module.exports = {
// //   solidity: "0.8.19",
// // };

// module.exports = {
//   networks: {
//     arbitrum_goerli: {
//       // url: process.env.ARBITRUM_GOERLI_RPC_URL,
//       url: "https://arb-goerli.g.alchemy.com/v2/urG_xwTZUe08SnM0wfe7kde_OXPFgu37",
//       chainId: 421613,
//       accounts: [process.env.TESTING_ACCOUNT_PRIVATE_KEY],
//     },
//   },
//   solidity: {
//     version: "0.8.0",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };

/** Import Packages */
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";

// Mainnets configs

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "Your etherscan API key";

// Testnets configs
/** 1. RPC */
const ETHEREUM_SEPOLIA_RPC_URL =
  process.env.ETHEREUM_SEPOLIA_RPC_URL ||
  "https://rpc.abmatrix.cn/json-rpc/http/eth_sepolia";
const OPTIMISM_GOERLI_RPC_URL =
  process.env.OPTIMISM_GOERLI_RPC_URL ||
  "https://rpc.abmatrix.cn/json-rpc/http/optimism_goerli";
const ARBITRUM_GOERLI_RPC_URL =
  process.env.ARBITRUM_GOERLI_RPC_URL ||
  "https://rpc.abmatrix.cn/json-rpc/http/arbitrum_goerli";

/** 2. Testnet accounts */
const TESTING_ACCOUNT_PRIVATE_KEY = process.env.TESTING_ACCOUNT_PRIVATE_KEY;

// Hardhat user-specific configs
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {
    //   // // If you want to do some forking, uncomment this
    //   // forking: {
    //   //   url: MAINNET_RPC_URL
    //   // }
    //   chainId: 31337,
    // },
    // localhost: {
    //   url: "http://127.0.0.1:8545/",
    //   chainId: 31337,
    //   // saveDeployments: false,
    // },
    // // Testnets
    // ethereum_sepolia: {
    //   url: ETHEREUM_SEPOLIA_RPC_URL,
    //   accounts: [
    //     TESTING_ACCOUNT_PRIVATE_KEY !== undefined
    //       ? TESTING_ACCOUNT_PRIVATE_KEY
    //       : "",
    //   ],
    //   // saveDeployments: true,
    //   chainId: 11155111,
    // },
    // optimism_goerli: {
    //   url: OPTIMISM_GOERLI_RPC_URL,
    //   accounts: [
    //     TESTING_ACCOUNT_PRIVATE_KEY !== undefined
    //       ? TESTING_ACCOUNT_PRIVATE_KEY
    //       : "",
    //   ],
    //   // saveDeployments: true,
    //   chainId: 420,
    // },
    arbitrum_goerli: {
      url: ARBITRUM_GOERLI_RPC_URL,
      // accounts: [
      //   TESTING_ACCOUNT_PRIVATE_KEY !== undefined
      //     ? TESTING_ACCOUNT_PRIVATE_KEY
      //     : "",
      // ],
      accounts: [
        "0x0212bdc1b7fc77b58f53f73c4653d65884a778f73a048af0d7b1ab2cd628af2d",
      ],
      // saveDeployments: true,
      chainId: 421613,
    },
  },
  // Check out: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#multiple-api-keys-and-alternative-block-explorers
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      ethereum_goerli: ETHERSCAN_API_KEY,
    },
  },
  // Check out: https://www.npmjs.com/package/hardhat-gas-reporter
  gasReporter: {
    enabled: false,
    //process.env.REPORT_GAS !== undefined ? true : false,
    token: "ETH",
    currency: "USD",
    outputFile: "./gas-reports/gas-reports.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPrice: 15,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  // namedAccounts: {
  //   deployer: {
  //     default: 0,
  //     420: 0,
  //     31337: 0,
  //     421613: 0,
  //     11155111: 0,
  //   },
  // },
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;
