const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for Document
*/
const DocumentSchema = new Schema({
  blobUri: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Document', DocumentSchema)
