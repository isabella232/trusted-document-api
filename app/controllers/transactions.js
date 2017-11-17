const fs = require('fs')
const winston = require('winston')
const services = require('../services')

/*
* Validates parameters for get "/transactions" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const getRequestValidator = (body) => {
  let errors = []

  // Add more validating according to your program
  if (errors.length !== 0) {
    return errors
  }
}


/*
* @async
* @returns {Promise<string>}
*/
const getRequestHandler = async (user, docId) => {
  winston.info('getRequestHandler', user)
  var revisions = await services.db.documentRevisions.getAllForDocument(docId)
  console.log(revisions)
  return revisions
}


module.exports = {
  getRequestValidator,
  getRequestHandler
}
