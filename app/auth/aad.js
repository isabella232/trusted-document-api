const passport = require('passport')
const config = require('config')
const winston = require('winston')
const BearerStrategy = require('passport-azure-ad').BearerStrategy
const services = require('../services')

let aadConfig = config.util.cloneDeep(config.get('azure.aad'))
passport.use(new BearerStrategy(aadConfig, (token, done) => {
  return done(null, {}, token)
}))

const getOrCreateUser = async (externanId, email) => {
  let user = await services.db.users.getByExternalId(externanId)
  if (!user) {
    winston.info('creating user')
    user = await services.db.users.create(externanId, email)
  }
  return user
}
/*
* Express middleware for verifying request tokens
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
const verifyToken = async (req, res, next) => {
  passport.authenticate('oauth-bearer', async (err, user, info) => {
    if (err || !user || !info) {
      return res.sendStatus(401)
    }

    req.user = await getOrCreateUser(info.sub, info.emails.pop())
    next()
  })(req, res, next)
}

module.exports = {
  verifyToken
}
