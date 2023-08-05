import { ethers } from "hardhat";
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying MyContract with the account:", deployer.address);

  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();

  await myContract.deployed();

  console.log("MyContract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
