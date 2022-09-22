require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs-extra");

// RESOURCES
// https://github.com/trufflesuite/ganache#readme
// https://docs.ethers.io/v5/single-page/

async function main() {
  // ganache rpc server listens on 8545
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545");

  // method 1, requires little effort, less secure
  // use private key from .env file
  // const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);

  // method 2, requires more effort, more secure
  // hide wallet's private key from .env file by encrypting it
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();

  const deployReceipt = await contract.deployTransaction.wait(1);

  console.log("Here is the deployment transaction:");
  console.log(contract.deployTransaction);

  console.log("Here is the deployment receipt:");
  console.log(deployReceipt);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7"); // send 7 as a string
  console.log("Here is the transaction response:");
  console.log(transactionResponse);

  const transactionReceipt = await transactionResponse.wait(1);
  console.log("Here is the transaction receipt:");
  console.log(transactionReceipt);

  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
