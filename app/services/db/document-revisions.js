const DocumentRevisions = require('./models/document-revisions')

/*
* Get all DocumentRevisions
* @async
* @returns {Promise<[(User|Array)]>} users - array of mongoose user object
*/
const getAll = () => {
  return DocumentRevisions.find().exec()
}

const getAllRevisionsWithoutTxHash = () => {
  return findByQuery({
    txHash: {$exists: false}
  })
}

const getAllRevisionsWithoutBlockNumber = () => {
  return findByQuery({
    blockNumber: {$exists: false},
    txHash: {$exists: true}
  })
}

/*
* Get DocumentRevisions by mongo _id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<User>} user - mongoose user object
*/
const getById = (_id) => {
  return DocumentRevisions.findById(_id).exec()
}

/*
* Get all DocumentRevisions for a given document
* @async
* @param {string} _documentId - mongo id for Document object
* @returns {Promise<User>} user - mongoose user object
*/
const getAllForDocument = (_documentId) => {
  return findByQuery({document: _documentId})
}

const findByQuery = (query) => {
  return DocumentRevisions.find(query).exec()
}

/*
* Create Document
* @async
* @param {string} blobUri - blobUri for this document
* @returns {Promise<User>} user - mongoose user object
*/
const create = (_documentId, blobUri, documentHash) => {
  return DocumentRevisions.create({
    document: _documentId,
    blobUri: blobUri,
    documentHash: documentHash
  })
}

const setTxHash = (_id, txHash) => {
  return DocumentRevisions.findByIdAndUpdate(_id, {
    $set: {
      txHash: txHash
    }
  }, { new: true })
}

const setBlockNumber = (_id, blockNumber) => {
  return DocumentRevisions.findByIdAndUpdate(_id, {
    $set: {
      blockNumber: blockNumber
    }
  }, { new: true })
}

/*
* Update a DocumentRevisions by mongo unique Id
* @async
* @param {string} _id - mongo id for user object
* @param {Object} fields - the fields on the user to update
* @returns {Promise<User>} user - updated user
*/
const update = (_id, fields) => {
  // TODO: Implement update User
  throw new Error('Not implemented')
}

/*
* Remove DocumentRevisions by mongo unique Id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<Object>} confirmation - mongoose deletion confirmation
*/
const remove = async (_id) => {
  return DocumentRevisions.remove({ _id: _id }).exec()
}

module.exports = {
  getAll,
  getAllRevisionsWithoutTxHash,
  getAllRevisionsWithoutBlockNumber,
  getById,
  getAllForDocument,
  create,
  update,
  setTxHash,
  setBlockNumber,
  remove
}
