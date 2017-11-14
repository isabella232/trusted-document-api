const winston = require('winston')
/*
* Validates parameters for get "/documents" api
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
* Validates parameters for post "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const postRequestValidator = (body) => {
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
const getRequestHandler = async (user) => {
  winston.info('getRequestHandler', user)
  return 'Get will api was called'
}

/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (user) => {
  winston.info('postRequestHandler', user)
  return 'Create will api was called'
}

module.exports = {
  getRequestValidator,
  postRequestValidator,
  getRequestHandler,
  postRequestHandler
}
