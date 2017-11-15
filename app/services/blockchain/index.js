var ethproof = require('ethproof');

var privateKeyHex = '774a1dee2b3a3d6c64c0e47124d3ac7522ae5c57e1fef1c4abb1b3dd63bffee6';
var destinationAddress = '44241d4e6a0fd2acff819478a87b7cdfe7963468';
var document = Buffer.from('Hello Crypto! ' + Math.random().toString());

var documentHash = ethproof.hashDocument(document);

logDocumentToBlockchain = function (file) {
    var txHash = ethproof.publishProof(privateKeyHex, destinationAddress, documentHash, 'https://rinkeby.infura.io/');
    console.log("Hey", txHash);
}

module.exports = {
    logDocumentToBlockchain: logDocumentToBlockchain
}
