const ethproof = require('ethproof')
const config = require('config')
const fs = require('fs')
let blockchainConfig = config.util.cloneDeep(config.get('blockchain'))


getDocHash = function (filepath) {
    var content = fs.readFileSync(filepath);
    return ethproof.hashDocument(content);
};

logDocumentToBlockchain = function (file) {
   
    return ethproof.publishProof(blockchainConfig.privateKey, blockchainConfig.destinationAddress, getDocHash(file.path), 'https://rinkeby.infura.io/');
}

module.exports = {
    logDocumentToBlockchain: logDocumentToBlockchain,
    getDocHash: getDocHash
}
