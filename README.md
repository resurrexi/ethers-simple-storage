## Setup

1. Create `.env` file and add `WALLET_KEY` and `WALLET_KEY_PASSWORD` variables. `WALLET_KEY` should be the private key for the wallet.
2. Install npm packages with `npm install`.
3. Generate `.encryptedKey.json` by running `node encryptKey.js`.
4. Remove `WALLET_KEY` from `.env` file.
5. Run deployment with `node deploy.js`.
