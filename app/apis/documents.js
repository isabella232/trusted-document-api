const express = require('express')
const router = express.Router()
const auth = require('../auth/aad')
const util = require('../utils/response')
const controller = require('../controllers/documents')

module.exports = (app) => {
  app.use('/api/documents', auth.verifyToken, router)
}

/*
* Handles get HTTP method api calls to /api/documents
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.get('/', (req, res, next) => {
  let errors = controller.getRequestValidator(req.body)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.getRequestHandler(req.user)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})

/*
* Handles post HTTP method api calls to /api/health
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.post('/', (req, res, next) => {
  let errors = controller.postRequestValidator(req.body)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.postRequestHandler(req.user)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})
