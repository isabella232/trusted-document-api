const ethproof = require('ethproof')
const config = require('config')
const fs = require('fs')
let blockchainConfig = config.util.cloneDeep(config.get('blockchain'))

const getDocHash = (filepath) => {
  var content = fs.readFileSync(filepath)
  return ethproof.hashDocument(content)
}

const logDocumentToBlockchain = (filepath) => {
  return ethproof.publishProof(blockchainConfig.privateKey, blockchainConfig.destinationAddress, getDocHash(filepath), 'https://rinkeby.infura.io/')
}

module.exports = {
  logDocumentToBlockchain,
  getDocHash
}
