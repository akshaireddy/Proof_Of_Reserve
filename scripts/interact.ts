const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Load the contract address from the deployment result or from the .env file
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!contractAddress) {
    console.error("Contract address not found. Please deploy the contract first.");
    return;
  }

  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.attach(contractAddress);

  console.log("Current reserve amount:", (await myContract.getReserveAmount()).toString());

  // Set a new reserve amount (Only the reserve manager can perform this action)
  const newReserveAmount = hre.ethers.utils.parseEther("100"); // Set the new reserve amount in Ether
  await myContract.deposit({ value: newReserveAmount });

  console.log("New reserve amount set:", newReserveAmount.toString());
  console.log("Check your transaction on BBN Testnet:", `http://testnet.bharatblockchain.io/address/${contractAddress}`);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
