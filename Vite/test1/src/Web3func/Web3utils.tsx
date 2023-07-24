import { ethers } from 'ethers';
import myJson from "../../../hardhat/artifacts/contracts/DonationContract.sol/DonationContract.json"  
  
const contractABI= myJson.abi// Replace with the ABI of your smart contract
const contractAddress='0x5FbDB2315678afecb367f032d93F642f64180aa3'
// Replace with your contract address and ABI obtained after deployment
  
  // Use MetaMask's injected provider
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
  export async function donate(name: string, amount: number): Promise<any> {
    if (!window.ethereum) {
      console.error('MetaMask not found');
      return;
    }
  
    try {
      const donationTx = await contract.donate(name, amount);
      await donationTx.wait();
      console.log('Donation Transaction:', donationTx);
      return donationTx;
    } catch (error) {
      console.error('Error donating:', error);
    }
  }
  
  export async function getTotalDonations(name: string): Promise<number> {
    if (!window.ethereum) {
      console.error('MetaMask not found');
      return 0;
    }
  
    try {
    console.log(await provider.getCode(contractAddress));
      const total = await contract.getTotalDonations(name);
      return parseInt(total.toString(), 10);
    } catch (error) {
      console.error('Error fetching total donations:', error);
      return 0;
    }
  }
  
  export async function getDonationCount(): Promise<number> {
    if (!window.ethereum) {
      console.error('MetaMask not found');
      return 0;
    }
  
    try {
        console.log(await provider.getCode(contractAddress));
      const count = await contract.getDonationCount();
      return parseInt(count.toString(), 10);
    } catch (error) {
      console.error('Error fetching donation count:', error);
      return 0;
    }
  }

