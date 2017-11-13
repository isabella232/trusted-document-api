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
  created: {
    type: Date,
    required: true
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', UserSchema)
