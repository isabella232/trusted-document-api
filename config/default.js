const path = require('path')
const env = process.env.NODE_ENV || 'development'

module.exports = {
  root: path.normalize(path.join(__dirname, '..')),
  env: env,
  isProduction: env === 'production',
  port: process.env.PORT || 3000,
  db: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://db/default',
      options: {
        useMongoClient: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 5
      }
    }
  },
  azure: {
    storage: {
      connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING
    },
    aad: {
      identityMetadata: 'https://login.microsoftonline.com/' + process.env.AAD_TENANT_ID + '/v2.0/.well-known/openid-configuration',
      clientID: process.env.AAD_B2C_CLIENT_APPLICATION_ID,
      policyName: process.env.AAD_B2C_POLICY_NAME || 'b2c_1_signup',
      isB2C: true,
      validateIssuer: true,
      loggingLevel: 'warn',
      passReqToCallback: false
    }
  },
  winston: {
    logLevel: process.env.WINSTON_LOG_LEVEL || 'verbose'
  }
}
