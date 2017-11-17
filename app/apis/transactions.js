const express = require('express')
const router = express.Router()
const auth = require('../auth/aad')
const util = require('../utils/response')
const controller = require('../controllers/transactions')

module.exports = (app) => {
  app.use('/api/transactions', auth.verifyToken, router)
}


/*
* Handles get HTTP method api calls to /api/transactions
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/

// TODO: move this to its own file
router.get('/:docId', (req, res, next) => {
  let errors = controller.getRequestValidator(req.body)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.getRequestHandler(req.user, req.params.docId)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})
