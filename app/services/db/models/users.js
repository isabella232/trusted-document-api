const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for User
*/
const UserSchema = new Schema({
  externalId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  }
})

module.exports = mongoose.model('User', UserSchema)
