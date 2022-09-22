require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const wallet = new ethers.Wallet(process.env.WALLET_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.WALLET_KEY
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });