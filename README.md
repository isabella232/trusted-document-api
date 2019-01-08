# Trusted Document API

**This is a proof of concept and is not suitable for production use without additional security and reliability considerations.**

The purpose of Trusted Document API is to provide a simple way to manage sensitive documents (e.g wills) with the ability to provide an unmodifiable transaction history.

![alt text](https://raw.githubusercontent.com/CatalystCode/trusted-document-api/master/readme/schema.png)

### Blockchain
In order to have an unmodifiable history of the document we record all transactions to Ethereum blockchain. The document will be stored off-chain (on Azure Blob Storage), but we will keep the document's hash in the blockchain using module [ethproof](https://www.npmjs.com/package/ethproof). This creates a permanent record of a document hash at a specific date and time, allowing us to prove when it was originally written and when modifications happaned.
We require either private or public blockchain to be setup before using our applicaion and environment variables ETHEREUM_PRIVATE_KEY, WALLET_DESTINATION_ADDRESS and BLOCKCHAIN_RPC_HOST to be set. For test purposes you can use free public blockchain [rinkeby](https://rinkeby.infura.io/).

### Authentication
We use Azure Active Directory B2C for identity. Follow [these steps](https://azure.microsoft.com/en-us/trial/get-started-active-directory-b2c/) to create and configure your Azure AD B2C Directory and set environment variable AAD_TENANT_ID, AAD_B2C_CLIENT_APPLICATION_ID, AAD_B2C_POLICY_NAME.

### Storage
For storing revisions of the documents we use Azure Blob Storage. To create Azure Storage account, follow [this tutorial](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-storage-account-powershell?toc=%2fazure%2fstorage%2fblobs%2ftoc.json), then set environment variable AZURE_STORAGE_CONNECTION_STRING. You can enable encryption for data at rest, following [this tutorial](https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption). Revisions of the document are stored in one container per user. 

### Database
We use mongo to store permissions and transaction hash in blockchain. We require envioronment variable MONGODB_URI to be specified (except local deployment). You can use any database service, including [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/). 

### Asynchronous jobs
In order to let user manage documents using our API without much waiting, we do Blockchain operations in cron jobs. Every minute (use can change interval by setting cronJobInterval in config/default.js) we find revisions of the documents in database that don't have transation hash and publish these transactions to the Blockchain. After transaction is recorded to Blockchain, we update database with block number and transation hash. 


## Deployment

Development and deployment of this application is completely dockerized. Just run [`docker-compose up`](https://docs.docker.com/compose/install/) (usually installed with docker) for local deployment. API and sample web app will be running on port 3000 (unless env variable PORT is set)

Required environment variables (described above): AZURE_STORAGE_CONNECTION_STRING, AAD_TENANT_ID, AAD_B2C_CLIENT_APPLICATION_ID, ETHEREUM_PRIVATE_KEY, WALLET_DESTINATION_ADDRESS


## Sample web app that uses API

Source code for sample web app that uses API can be found in /public folder.
It provides a simple UI to demostrate besic features of Trusted Document API: upload/update document and get transaction history for document. To be able to use these featues user has to be authenticated with AAD.

![alt text](https://raw.githubusercontent.com/CatalystCode/trusted-document-api/master/readme/sample-web-app.png)

