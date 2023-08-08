// const { ethers, upgrades } = require("hardhat")

// async function main() {
//     const [deployer] = await ethers.getSigners()

//     console.log("Deploying NumberGuessingGame...")

//     const NumberGuessingGame = await ethers.getContractFactory("NumberGuessingGame")
//     // const numberGuessingGame = await upgrades.deployProxy(
//     //     NumberGuessingGame,
//     //     [process.env.TESTING_ACCOUNT_ADDRESS, "0x9984748bb67825e9e1009A4412B42d0d765ef155"],
//     //     { initializer: "initialize" }
//     // )
//     const numberGuessingGame = await NumberGuessingGame.deploy(
//         "0x9984748bb67825e9e1009A4412B42d0d765ef155",
//         1,
//         1,
//         100
//     )

//     await numberGuessingGame.deployed()

//     console.log("NumberGuessingGame deployed to:", numberGuessingGame.address)
// }

// main().catch((error) => {
//     console.error(error)
//     process.exit(1)
// })

const { ethers } = require("ethers");

// const Web3 = require('web3');
// const web3 = new Web3('https://arb-goerli.g.alchemy.com/v2/urG_xwTZUe08SnM0wfe7kde_OXPFgu37');
// const contractAddress = '0x9984748bb67825e9e1009A4412B42d0d765ef155';  // VRNPort 合约地址
// const getContractAbi = async () => {
//     const contractCode = await web3.eth.getCode(contractAddress);
//     if (contractCode === '0x') {
//         throw new Error('Contract does not exist at the given address');
//     }
//     const contractAbi = await web3.eth.getAbi(contractAddress);
//     console.log('Contract ABI:', contractAbi);
// };
// getContractAbi().catch(error => console.error('Error:', error));

const ARBITRUM_GOERLI_RPC_URL =
  "https://arb-goerli.g.alchemy.com/v2/urG_xwTZUe08SnM0wfe7kde_OXPFgu37";
const CHAIN_ID = 421613;

// const contractAbi = [/* 合约 ABI */];  // 将合约 ABI 复制到这里
const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "committee_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bls_cid_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ecdsa_cid_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "RandomNumberReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bls_cid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ecdsa_cid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "RandomNumberRequested",
    type: "event",
  },
  {
    inputs: [],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "getRandomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestRandomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee_",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "chainid",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vrnport",
            type: "address",
          },
          {
            internalType: "address",
            name: "requester",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "randomNumber",
            type: "uint256",
          },
        ],
        internalType: "struct IVRNPort.RandomNumberFeed",
        name: "randomNumberFeed",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "setRandomNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
// const contractBytecode = '0x...';  // 将合约字节码复制到这里
const contractBytecode =
  "0x608060405234801561001057600080fd5b50604051610cae380380610cae83398101604081905261002f916100b9565b61003833610069565b600280546001600160a01b0319166001600160a01b03949094169390931790925560035560045560016005556100fc565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806000606084860312156100ce57600080fd5b83516001600160a01b03811681146100e557600080fd5b602085015160409095015190969495509392505050565b610ba38061010b6000396000f3fe6080604052600436106100815760003560e01c8063077001b9146100865780633ccfd60b146100aa5780633dc33423146100c157806369fe0e2d146100e1578063715018a6146101015780638678a7b2146101165780638da5cb5b1461011e578063b37217a414610146578063ced72f8714610166578063f2fde38b1461017b575b600080fd5b34801561009257600080fd5b506001545b6040519081526020015b60405180910390f35b3480156100b657600080fd5b506100bf61019b565b005b3480156100cd57600080fd5b506100bf6100dc366004610a34565b6101d6565b3480156100ed57600080fd5b506100bf6100fc366004610afb565b6103ed565b34801561010d57600080fd5b506100bf6103fa565b61009761040e565b34801561012a57600080fd5b506000546040516001600160a01b0390911681526020016100a1565b34801561015257600080fd5b50610097610161366004610afb565b6104d8565b34801561017257600080fd5b50600554610097565b34801561018757600080fd5b506100bf610196366004610b14565b610545565b6101a36105be565b6040514790339082156108fc029083906000818181858888f193505050501580156101d2573d6000803e3d6000fd5b5050565b8251461461021d5760405162461bcd60e51b815260206004820152600f60248201526e125b9d985b1a590818da185a5b9a59608a1b60448201526064015b60405180910390fd5b60208301516001600160a01b031630146102735760405162461bcd60e51b8152602060048201526017602482015276496e76616c69642076726e706f7274206164647265737360481b6044820152606401610214565b600154836060015111156102bd5760405162461bcd60e51b8152602060048201526011602482015270125b9d985b1a59081c995c5d595cdd1259607a1b6044820152606401610214565b6102c8838383610618565b6103085760405162461bcd60e51b8152602060048201526011602482015270494e56414c49445f5349474e415455524560781b6044820152606401610214565b606083015160009081526007602052604090205460ff16156103685760405162461bcd60e51b815260206004820152601960248201527814985b991bdb481b9d5b58995c88185b1c9958591e481cd95d603a1b6044820152606401610214565b6060830180516000908152600760209081526040808320805460ff191660011790556080870151845184526006909252918290205580850151915190516001600160a01b03909216917f880726f341ef886b90e4e4b02a26013f22f023fb94c1eb4a1056c62087a414f3916103e09190815260200190565b60405180910390a2505050565b6103f56105be565b600555565b6104026105be565b61040c600061071c565b565b60006005543410156104715760405162461bcd60e51b815260206004820152602660248201527f6d73672e76616c75652073686f756c64206e6f74206265206c6573732074686160448201526537103332b29760d11b6064820152608401610214565b6001805461047e91610b36565b60018190556003546004546040805193845260208401929092529082015246606082015233907f245efeebeff48ea3736b8700bcdd4a378638483d5462aaaa8ab98e257052db959060800160405180910390a25060015490565b60008181526007602052604081205460ff166105325760405162461bcd60e51b815260206004820152601960248201527814985b991bdb481b9d5b58995c881b9bdd081cd95d081e595d603a1b6044820152606401610214565b5060009081526006602052604090205490565b61054d6105be565b6001600160a01b0381166105b25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610214565b6105bb8161071c565b50565b6000546001600160a01b0316331461040c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610214565b6040805184516020808301919091528501516001600160a01b03908116828401529185015190911660608083019190915284015160808083019190915284015160a0820152600090819060c00160405160208183030381529060405280519060200120905060006106b6827f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c91909152603c902090565b600254604080516020601f89018190048102820181019092528781529293506001600160a01b039091169161070891849190899089908190840183828082843760009201919091525061076c92505050565b6001600160a01b0316149695505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080600061077b8585610792565b91509150610788816107d7565b5090505b92915050565b60008082516041036107c85760208301516040840151606085015160001a6107bc8782858561091c565b945094505050506107d0565b506000905060025b9250929050565b60008160048111156107eb576107eb610b57565b036107f35750565b600181600481111561080757610807610b57565b0361084f5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b6044820152606401610214565b600281600481111561086357610863610b57565b036108b05760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610214565b60038160048111156108c4576108c4610b57565b036105bb5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610214565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b0383111561094957506000905060036109cd565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561099d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166109c6576000600192509250506109cd565b9150600090505b94509492505050565b80356001600160a01b03811681146109ed57600080fd5b919050565b60008083601f840112610a0457600080fd5b50813567ffffffffffffffff811115610a1c57600080fd5b6020830191508360208285010111156107d057600080fd5b600080600083850360c0811215610a4a57600080fd5b60a0811215610a5857600080fd5b5060405160a0810167ffffffffffffffff8282108183111715610a8b57634e487b7160e01b600052604160045260246000fd5b8160405286358352610a9f602088016109d6565b6020840152610ab0604088016109d6565b6040840152606087013560608401526080870135608084015282955060a0870135925080831115610ae057600080fd5b5050610aee868287016109f2565b9497909650939450505050565b600060208284031215610b0d57600080fd5b5035919050565b600060208284031215610b2657600080fd5b610b2f826109d6565b9392505050565b8082018082111561078c57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea26469706673582212207db075be4dc30808365789adba516b1d1f1b3a55921763fb4c1c309f6c73aec064736f6c63430008100033";
const vrnPortAddress = "0x9984748bb67825e9e1009A4412B42d0d765ef155"; // VRNPort 合约地址

const deployAndTest = async () => {
  const provider = new ethers.JsonRpcProvider(
    ARBITRUM_GOERLI_RPC_URL,
    CHAIN_ID
  );
  const signer = provider.getSigner();

  const contractFactory = new ethers.ContractFactory(
    contractAbi,
    contractBytecode,
    signer
  );
  const contract = await contractFactory.deploy(vrnPortAddress);

  await contract.deployed();
  console.log("Contract deployed at:", contract.address);

  await testContract(contract, signer);
};

const testContract = async (contract, signer) => {
  const owner = await contract.owner();
  console.log("Contract owner:", owner);

  // 调用合约的其他函数进行测试
  const startGameTx = await contract.connect(signer).startGame();
  await startGameTx.wait();

  // 进行其他测试操作
  // ...

  console.log("Tests completed.");
};

deployAndTest().catch((error) => console.error("Error:", error));

// const Web3 = require("web3");
// const web3 = new Web3(
//   "https://arb-goerli.g.alchemy.com/v2/urG_xwTZUe08SnM0wfe7kde_OXPFgu37"
// );

// const contractAddress = "0x9984748bb67825e9e1009A4412B42d0d765ef155"; // VRNPort 合约地址

// const getContractAbi = async () => {
//   const contractCode = await web3.eth.getCode(contractAddress);
//   if (contractCode === "0x") {
//     throw new Error("Contract does not exist at the given address");
//   }

//   const contractAbi = await web3.eth.getAbi(contractAddress);
//   console.log("Contract ABI:", contractAbi);
// };

// getContractAbi().catch((error) => console.error("Error:", error));
