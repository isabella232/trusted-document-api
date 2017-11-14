const passport = require('passport')
const config = require('config')
const BearerStrategy = require('passport-azure-ad').BearerStrategy

let aadConfig = config.util.cloneDeep(config.get('azure.aad'))
passport.use(new BearerStrategy(aadConfig, (token, done) => {
  return done(null, {}, token)
}))

/*
* Express middleware for verifying request tokens
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
const verifyToken = (req, res, next) => {
  passport.authenticate('oauth-bearer', (err, user, info) => {
    if (err || !user || !info) {
      return res.sendStatus(401)
    }

    req.user = info
    next()
  })(req, res, next)
}

module.exports = {
  verifyToken
}
