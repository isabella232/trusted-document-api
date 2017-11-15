const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for DocumentRevision
*/
const DocumentRevisionSchema = new Schema({
  document: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  blobUri: {
    type: String,
    required: true
  },
  documentHash: {
    type: String,
    required: true
  },
  txHash: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('DocumentRevision', DocumentRevisionSchema)
