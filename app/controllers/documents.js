const winston = require('winston')
const multiparty = require('multiparty')
var blob = require("../services/azure/blob.js");
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
  winston.info('getRequestHandler', user);
  return 'Get will api was called'
}

/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (req) => {
  winston.info('postRequestHandler', req.user);

  //todo: move it to appropriate place
  var form = new multiparty.Form();
  form.on('part', function(part) {
      console.log(part.filename);

      if (part.filename) {
          blob.addBlob(req.user.emails[0], part)
      } else {
          form.handlePart(part);
      }
  });
  form.parse(req);

  return 'Create will api was called'
}

module.exports = {
  getRequestValidator,
  postRequestValidator,
  getRequestHandler,
  postRequestHandler
}
