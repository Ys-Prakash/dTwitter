const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  // console.log(process.env.ALCHEMY_API_KEY_URL)

  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL = "ipfs://QmcmDAwbNLzJ5YtAV2okC7EWA6LVvNCZ5MsKUgZ5RVE721/";
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const dsmNftContract = await ethers.getContractFactory("DsmNft");

  // deploy the contract
  const deployeddsmNftContract = await dsmNftContract.deploy(metadataURL);

  await deployeddsmNftContract.deployed();

  // print the address of the deployed contract
  console.log("LW3Punks Contract Address:", deployeddsmNftContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });