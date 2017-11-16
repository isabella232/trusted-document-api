const db = require('./db')
const azure = require('./azure')
const blockchain = require('./blockchain')

module.exports = {
  db: db,
  azure,
  blockchain
}
