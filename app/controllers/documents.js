const winston = require('winston')
const blob = require("../services/azure/blob.js");
const services = require("../services");
const fs = require('fs');
/*
* Validates parameters for get "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const getRequestValidator = (body) => {
  let errors = []

  // Add more validating according to your program

  if (errors.length !== 0) {
    return errors
  }
}

/*
* Validates parameters for post "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const postRequestValidator = (body) => {
  let errors = []

  // Add more validating according to your program

  if (errors.length !== 0) {
    return errors
  }
}

/*
* @async
* @returns {Promise<string>}
*/
const getRequestHandler = async (user) => {
  winston.info('getRequestHandler', user);

  if(!user) return

  let perms = await services.db.permissions.getPermissionsbyUserId(user)
  console.log('perms', perms)
}

/*
* @async
* @returns {Promise<string>}
*/
const getByIdRequestHandler = async (user, docId) => {
  winston.info('getRequestHandler', user);
  var doc = await services.db.documents.getById(docId);
  console.log(doc.latestRev)
  return doc.latestRev;
}

/*
* @async
* @returns {Promise<string>}
*/
const getTxHistoryRequestHandler = async (user, docId) => {
  winston.info('getTxHistoryRequestHandler', user);
  var revisions = await services.db.documentRevisions.getAllForDocument(docId);
  console.log(revisions)
  return revisions;
}

/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (user, files) => {

  winston.info('postRequestHandler', user);
  if (!files || !files[0]) {
    return
  }
  var file = files[0];

  var blobUri = await blob.addBlob(user.emails[0], file);
  console.log("File was uploaded to Blob Storage. Uri - " + blobUri);

  var txHash = services.blockchain.logDocumentToBlockchain(file.path);

  var documentHash = services.blockchain.getDocHash(file.path);
  console.log("Transaction was recorded in Blockchain. TxHash -" + txHash);

  try {
    var documentEntity = await services.db.documents.create({});
    var docRev = await services.db.documentRevisions.create(documentEntity, blobUri, documentHash, txHash)
  }
  catch (e) {
    console.log(e);
  }
  console.log("Document revision was created", docRev);

  fs.unlink(file.path, (err) => {
    if (err) throw err;
    console.log("File was removed locally");
    return "Success"
  });

}

module.exports = {
  getRequestValidator,
  postRequestValidator,
  getRequestHandler,
  postRequestHandler,
  getTxHistoryRequestHandler,
  getByIdRequestHandler
}
