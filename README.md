## Setup

1. Install npm packages with `npm install`.
2. Run ganache on local with `npm run ganache`. Copy one of the private keys from the generated wallets.
3. Create `.env` file and add `WALLET_KEY` and `WALLET_KEY_PASSWORD` variables. `WALLET_KEY` should be the private key for the wallet copied from above step.
4. Generate `.encryptedKey.json` by running `node encryptKey.js`.
5. Remove `WALLET_KEY` from `.env` file.
6. Compile contract with `npm run solc`. This will generate the `.abi` and `.bin` files.
7. Run deployment with `node deploy.js`. If script is converted to TypeScript, run with `npx ts-node deploy.ts`.
