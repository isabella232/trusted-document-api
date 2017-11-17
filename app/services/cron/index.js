const winston = require('winston')
const config = require('config')
const documentRevision = require('../db/document-revisions')
const blockchain = require('../blockchain')

const writeToChain = async () => {
  winston.info('cronjob: writing doc hashes to the chain')
  let newRevisions = await documentRevision.getAllRevisionsWithoutTxHash()
  newRevisions.forEach(async (revision) => {
    let txHash = blockchain.logDataToBlockchain(revision.documentHash)
    await documentRevision.setTxHash(revision, txHash)
  })
}

const verifyTransaction = async () => {
  winston.info('cronjob: verifying transaction hashes from db')
  let newTransactions = await documentRevision.getAllRevisionsWithoutBlockNumber()
  newTransactions.forEach(async (transaction) => {
    let blockData = blockchain.getBlocDataForTxHash(transaction.txHash)
    if (blockData) {
      await documentRevision.setBlockNumber(transaction, blockData.blockNumber)
    }
  })
}

// Run cron job
setInterval(() => {
  // Fire and forget
  writeToChain()
  verifyTransaction()
}, config.get('cronJobInterval') * 1000) // Convert ms to s
