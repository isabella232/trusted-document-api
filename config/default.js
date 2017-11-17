const path = require('path')
const root = path.normalize(path.join(__dirname, '..'))
const env = process.env.NODE_ENV || 'development'

module.exports = {
  root: root,
  env: env,
  isProduction: env === 'production',
  port: process.env.PORT || 3000,
  uploadFolder: path.join(root, '.upload'),
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
  cronJobInterval: 60, // seconds
  blockchain: {
    privateKey: process.env.ETHEREUM_PRIVATE_KEY,
    destinationAddress: process.env.WALLET_DESTINATION_ADDRESS,
    host: process.env.BLOCKCHAIN_RPC_HOST || 'https://rinkeby.infura.io/'
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
