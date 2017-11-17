const ethproof = require('ethproof')
const config = require('config')
const Web3 = require('web3')
const fs = require('fs')

const getDocHash = (filepath) => {
  var content = fs.readFileSync(filepath)
  return ethproof.hashDocument(content)
}

const logDataToBlockchain = (data) => {
  return ethproof.publishProof(config.get('blockchain.privateKey'),
    config.get('blockchain.destinationAddress'),
    data,
    config.get('blockchain.host'))
}

const getBlocDataForTxHash = (txHash) => {
  let web3 = new Web3(new Web3.providers.HttpProvider(config.get('blockchain.host')))
  return web3.eth.getTransaction(txHash)
}

module.exports = {
  logDataToBlockchain,
  getBlocDataForTxHash,
  getDocHash
}
