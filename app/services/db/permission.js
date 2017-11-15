const Permission = require('./models/permission')

/*
* Get all Documents
* @async
* @returns {Promise<[(User|Array)]>} users - array of mongoose user object
*/
const getAll = () => {
  return Permission.find()
    .populate('user')
    .populate('document')
    .exec()
}

/*
* Get Document by mongo _id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<User>} user - mongoose user object
*/
const getById = (_id) => {
  return Permission.findById(_id)
  .populate('user')
  .populate('document')
  .exec()
}

/*
* Create Document
* @async
* @param {string} blobUri - blobUri for this document
* @returns {Promise<User>} user - mongoose user object
*/
const create = (blobUri) => {
  return Permission.create({
    blobUri: blobUri
  })
}

/*
* Update a Document by mongo unique Id
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
* Remove Document by mongo unique Id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<Object>} confirmation - mongoose deletion confirmation
*/
const remove = async (_id) => {
  return Document
    .remove({ _id: _id })
    .exec()
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}