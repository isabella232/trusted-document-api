const users = require('./users')
const documents = require('./document')
const documentRevisions = require('./document-revision')
const permissions = require('./permission')

module.exports = {
  users,
  documents,
  documentRevisions,
  permissions
}

// const init = async () => {
//   // let user = await users.create('test@gmail.com')
//   let user = await users.getByEmail('test@gmail.com')
//   console.log(user)

//   let myDoc = await documents.create()
//   console.log(myDoc)
//   let latest = await documentRevisions.create(myDoc, 'blobUri', '0xksjdhf', '0x2135')

//   console.log(latest)
// }

// init()
