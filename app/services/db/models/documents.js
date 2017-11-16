const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for Document
*/
const DocumentSchema = new Schema({
  latestRev: {
    type: Schema.Types.ObjectId,
    ref: 'DocumentRevision'
  }
})

module.exports = mongoose.model('Document', DocumentSchema)
