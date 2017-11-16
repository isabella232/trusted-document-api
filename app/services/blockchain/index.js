const ethproof = require('ethproof')
const config = require('config')
const fs = require('fs')
let blockchainConfig = config.util.cloneDeep(config.get('blockchain'))


getDocHash = function (filepath) {
    var content = fs.readFileSync(filepath);
    return ethproof.hashDocument(content);
};

logDocumentToBlockchain = function (filepath) {
    return ethproof.publishProof(blockchainConfig.privateKey, blockchainConfig.destinationAddress, getDocHash(filepath), 'https://rinkeby.infura.io/');
}

module.exports = {
    logDocumentToBlockchain: logDocumentToBlockchain,
    getDocHash: getDocHash
}
