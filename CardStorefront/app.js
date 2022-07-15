//to run : node filename.js
const express = require("express");
const nearAPI = require("near-api-js");
const app = express();
const port = 3000;
const { connect, KeyPair, keyStores, WalletConnection } = nearAPI;

async function main() {
  // creates keyStore using private key in local storage
  // *** REQUIRES SignIn using walletConnection.requestSignIn() ***

  // creates a keyStore that searches for keys in .near-credentials
  // requires credentials stored locally by using a NEAR-CLI command: `near login`
  // https://docs.near.org/docs/tools/near-cli#near-login

  // creates keyStore from a provided file
  // you will need to pass the location of the .json key pair

  const fs = require("fs");
  const homedir = require("os").homedir();

  const ACCOUNT_ID = "near-example.testnet"; // NEAR account tied to the keyPair
  const NETWORK_ID = "testnet";
  // path to your custom keyPair location (ex. function access key for example account)
  const KEY_PATH = "/.near-credentials/testnet/akileus0.testnet.json";

  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

  const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  // connect to NEAR
  const near = await connect(config);


  const account = await near.account("akileus0.testnet");

  // gets account balance
  const balance = await account.getAccountBalance();
  const detail = await account.getAccountDetails();

  console.log("Balance:", balance);
}

// app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express

main();