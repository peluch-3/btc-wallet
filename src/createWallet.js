// importing dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// bitcoin - mainnet
// testnet - testnet

const network = bitcoin.networks.testnet

// HD wallet derivation
const path = `m/49'/1'/0'/0`

//creating mnemonic seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//creating HD wallet root
let root = bip32.fromSeed(seed, network)

//creating account pair priv-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("wallet geenerated")
console.log("Endereco:", btcAddress)
console.log("Priv key: ", node.toWIF())
console.log("Seed", mnemonic)