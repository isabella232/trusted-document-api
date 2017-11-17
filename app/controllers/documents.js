const fs = require('fs')
const winston = require('winston')
const services = require('../services')

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
* Validates parameters for post "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const patchRequestValidator = (user, docId, files) => {
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
  winston.info('getRequestHandler', user)

  if (!user) return

  let perms = await services.db.permissions.getPermissionsbyUserId(user);

  return perms;
}

/*
* @async
* @returns {Promise<string>}
*/
const getByIdRequestHandler = async (user, docId) => {
  winston.info('getRequestHandler', user)
  var doc = await services.db.documents.getById(docId)
  console.log(doc.latestRev)
  return doc.latestRev
}


/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (user, files, docId) => {
  winston.info('postRequestHandler')

  if (!files || !files[0]) {
    return
  }
  let file = files[0]

  let blobUri = await services.blob.addBlob(user.email, file)
  winston.info('File was uploaded to Blob Storage. Uri - ' + blobUri)

  let documentHash = services.blockchain.getDocHash(file.path)
  fs.unlink(file.path) // Fire and forget

  let documentEntity = (docId ? await services.db.documents.getById(docId) : await services.db.documents.create(file.originalname));

  if (documentEntity.name != file.originalname) {
    services.db.documents.update(docId, { name: file.originalname })
  }

  let docRev = await services.db.documentRevisions.create(documentEntity, blobUri, documentHash)
  let updateDocument = await services.db.documents.setLatest(documentEntity, docRev)
  await services.db.permissions.create(user, documentEntity, 'OWNER')

  winston.info('Document revision was created')
  console.log(updateDocument)
  return [{ 'document': updateDocument, 'access': 'OWNER' }];
}


module.exports = {
  getRequestValidator,
  postRequestValidator,
  getRequestHandler,
  postRequestHandler,
  getByIdRequestHandler,
}
