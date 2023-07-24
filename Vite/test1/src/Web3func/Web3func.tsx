// import { ethers } from 'ethers'

// (async()=>{
// const Storage = await ethers.getContractFactory("Storage");
//     const storage = await Storage.deploy();
//     await storage.deployed();
//     const storage2 = await ethers.getContractAt("Storage", storage.address);
//     await storage2.store(56);
//     //await setValue.wait();
//     console.log((await storage2.retrieve()).toNumber(),storage.address)
// });

import detectEthereumProvider from '@metamask/detect-provider';

const ethereum =  window.ethereum

const provider = await detectEthereumProvider();

if (provider) {
  startApp(provider); // Initialize your app
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider:any) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

// const chainId = await ethereum.request({ method: 'eth_chainId' });
// handleChainChanged(chainId);

// ethereum.on('chainChanged', handleChainChanged);

// function handleChainChanged(_chainId:any) {
//   // We recommend reloading the page, unless you must do otherwise
//   window.location.reload();
// }

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount:any = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err:any) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts:any) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
const connect = async () =>{
  const test= await ethereum.request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged) 
    .then(()=>{
        console.log(currentAccount);
        
    })
    .catch((err:any) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    return currentAccount;
};

export const getActiveAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (e) {
      console.error('Error fetching accounts:', e);
      return null;
    }
  };
//ethereum.request({ method: 'eth_requestAccounts', params: [] });

export default currentAccount


// import Web3 from 'web3'
// import { Contract, ContractSendMethod, Options } from 'web3-eth-contract'

// (async()=> {

//     const web3 = new Web3(web3Provider)
//     // Note that the script needs the ABI which is generated from the compilation artifact.
//     // Make sure contract is compiled and artifacts are generated
//     const artifactsPath = `browser/contracts/artifacts/Storage.json`

//     const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))

//     const accounts = await web3.eth.getAccounts()

//     const contract = new web3.eth.Contract([
// 	{
// 		"inputs": [],
// 		"name": "retrieve",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "store",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ],'608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220322c78243e61b783558509c9cc22cb8493dde6925aa5e89a08cdf6e22f279ef164736f6c63430008120033');

//     await contract.methods.store(1).call();
//     console.log((await contract.methods.retrieve().call()).toNumber())
// });


// const web3 = new Web3(window.ethereum); // Replace with your Ethereum node URL

// (async()=>{const accounts = await web3.eth.getAccounts()
// const contractABI:any = [
// 	{
// 		"inputs": [],
// 		"name": "retrieve",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "store",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];

// const contractAddress = '0x38cB7800C3Fddb8dda074C1c650A155154924C73'; // Replace with the actual contract address

// const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// const num = 42; // The value to store
// contractInstance.methods.store(num).send({ from: accounts[0] }); // Replace with the sender's address
// //   .on('transactionHash', (hash: string) => {
// //     console.log('Transaction hash:', hash);
// //   })
// //   .on('receipt', (receipt: any) => {
// //     console.log('Transaction receipt:', receipt);
// //     retrieveValue();
// //   })
// //   .on('error', (error: any) => {
// //     console.error('Error:', error.message);
// //   });

// function retrieveValue() {
//   contractInstance.methods.retrieve().call()
//     .then((result: string) => {
//       console.log('Retrieved value:', result);
//     })
//     .catch((error: any) => {
//       console.error('Error:', error);
//     });
// }

// retrieveValue();

// })();