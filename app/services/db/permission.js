const Permission = require('./models/permission')

/*
* Get all Permissions
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
* Get Permission by mongo _id
* @async
* @param {string} _id - mongo id for permission object
* @returns {Promise<User>} user - mongoose permission object
*/
const getPermissionsbyUserId = (user) => {
  return Permission.find({ user: user})
    .populate('user')
    .populate('document')
    .exec()
}

/*
* Get Permission by userId _id
* @async
* @param {string} _id - user id for user object
* @returns {Promise<User>} user - mongoose user object
*/
const getById = (_id) => {
  return Permission.findById(_id)
  .populate('user')
  .populate('document')
  .exec()
}

/*
* Create Permission
* @async
* @param {string} blobUri - blobUri for this document
* @returns {Promise<User>} user - mongoose user object
*/
const create = (user, document, permission) => {
  return Permission.create({
    user: user,
    document: document,
    access: permission
  })
}

/*
* Update a Permission by mongo unique Id
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
* Remove Permission by mongo unique Id
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
  getPermissionsbyUserId,
  create,
  update,
  remove
}