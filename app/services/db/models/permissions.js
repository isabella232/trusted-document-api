const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* Mongoose Schema for Permission
*/
const PermissionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  document: {
    type: Schema.Types.ObjectId,
    ref: 'Document'
  },
  access: {
    type: String,
    enum: ['R', 'RW'],
    default: 'R',
    required: true
  }
})

module.exports = mongoose.model('Permission', PermissionSchema)
