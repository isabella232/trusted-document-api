const Users = require('./models/users')

/*
* Get all users
* @async
* @returns {Promise<[(User|Array)]>} users - array of mongoose user object
*/
const getAll = () => {
  return Users.find().exec()
}

/*
* Get user by mongo _id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<User>} user - mongoose user object
*/
const getById = (_id) => {
  return Users.findById(_id).exec()
}

/*
* Get user by email
* @async
* @param {string} email - user email
* @returns {Promise<User>} user - mongoose user object
*/
const getByEmail = (email) => {
  return Users.findOne({
    email: email
  })
  .exec();
}

/*
* Create user
* @async
* @param {string} uniqueId - application uniqueId
* @param {string} externalId - externalId of the user
* @param {string} outlet - The outlet the user signed in from
* @param {string} email - email address
* @param {string} firstName - first name
* @param {string} lastName - last name
* @returns {Promise<User>} user - mongoose user object
*/
const create = (email) => {
  return Users.create({
    email: email
  })
}

/*
* Update a user by mongo unique Id
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
* Remove user by mongo unique Id
* @async
* @param {string} _id - mongo id for user object
* @returns {Promise<Object>} confirmation - mongoose deletion confirmation
*/
const remove = async (_id) => {
  return Users.remove({ _id: _id }).exec()
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
