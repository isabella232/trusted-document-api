const azureStorage = require('azure-storage')
const blobSvc = azureStorage.createBlobService()
const crypto = require('crypto')

function getContainer (userId) {
  var userIdHash = crypto.createHash('md5').update(userId).digest('hex')

  return new Promise(function (resolve, reject) {
    blobSvc.createContainerIfNotExists(userIdHash, function (error, result, response) {
      if (error) {
        reject(error)
      } else {
        console.log(response)
        resolve(response.etag)
      }
    })
  })
}

const addBlob = async (userId, fileName, stream) => {
  let containerName = await getContainer(userId)
  var fileNameHash = crypto.createHash('md5').update(fileName).digest('hex')
  blobSvc.createAppendBlobFromStream(containerName, fileNameHash, stream, function (error, result, response) {
    if (!error) {
      // file uploaded
    }
  })
}
module.exports = {
  addBlob: addBlob
}
