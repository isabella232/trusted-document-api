/*
* Express middleware for verifying request tokens
* @param {Object} req - express req object
* @param {Object} res - express res object
* @param {Object} next - express next object
*/
const verifyToken = (req, res, next) => {
/*
  if (!token) {
    return res.status(403).send({message: 'No auth or wrong token'})
  }
*/
  next()
}

module.exports = {
  verifyToken
}
