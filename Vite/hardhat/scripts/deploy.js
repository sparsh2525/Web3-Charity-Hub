import { ethers } from "ethers";

import myJson from "../artifacts/contracts/DonationContract.sol/DonationContract.json"  assert {
  type: "json",
}

const contractABI= myJson.abi// Replace with the ABI of your smart contract
const bytecode=myJson.bytecode

async function deployContract() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signer = provider.getSigner();

  const MyContractFactory = new ethers.ContractFactory(contractABI, bytecode, signer);

  try {
    const myContract = await MyContractFactory.deploy();

    await myContract.deployed();

    console.log("MyContract deployed to:", myContract.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

deployContract();
