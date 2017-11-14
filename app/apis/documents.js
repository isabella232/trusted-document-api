const express = require('express')
const router = express.Router()
const auth = require('../auth/aad')

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
  res.send('Get will api was called')
})

/*
* Handles post HTTP method api calls to /api/health
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
router.post('/', (req, res, next) => {
  res.send('Create will api was called')
})
