const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for User
*/
const UserSchema = new Schema({
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  permission: {
    type: String,
    enum: ['READ', 'READWRITE'],
    default: 'READ'
  },
  lastAccessed: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', UserSchema)
