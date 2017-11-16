const express = require('express')
const router = express.Router()
const auth = require('../auth/aad')
const util = require('../utils/response')
const controller = require('../controllers/permissions')

module.exports = (app) => {
  app.use('/api/permissions', auth.verifyToken, router)
}

/*
* Handles get HTTP method api calls to /api/permissions
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.get('/', (req, res, next) => {
  let errors = controller.getRequestValidator(req.user)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.getRequestHandler(req.user)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})

/*
* Handles get HTTP method api calls to /api/permissions/:permissionId
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.get('/:permissionId', (req, res, next) => {
  let errors = controller.getByIdRequestValidator(req.user, req.params.permissionId)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.getByIdRequestHandler(req.user, req.params.permissionId)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})

/*
* Handles post HTTP method api calls to /api/permissions
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.post('/', (req, res, next) => {
  let errors = controller.postRequestValidator(req.user,
    req.body.userId,
    req.body.documentId,
    req.body.permissionsType)

  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.postRequestHandler(req.user,
    req.body.userId,
    req.body.documentId,
    req.body.permissionsType)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})

/*
* Handles delete HTTP method api calls to /api/permissions/:permissionId
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.delete('/:permissionId', (req, res, next) => {
  let errors = controller.deleteRequestValidator(req.user, req.params.permissionId)
  if (errors) {
    return util.handleRequestError(res, errors)
  }

  controller.deleteRequestHandler(req.user, req.params.permissionId)
    .then(util.respondWithResult(res))
    .catch(util.handleInternalError(res))
})
