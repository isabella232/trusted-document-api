const azureStorage = require('azure-storage')
const blobSvc = azureStorage.createBlobService()
const crypto = require('crypto')

const createBlockBlobFromLocalFile = (containerName, fileNameHash, filepath) => {
  return new Promise(function (resolve, reject) {
    blobSvc.createBlockBlobFromLocalFile(containerName, fileNameHash, filepath, (err, result, response) => {
      if (err) {
        reject(err)
      }
      resolve(result.container + '/' + result.name)
    })
  })
}

function getContainer (userId) {
  var userIdHash = crypto.createHash('md5').update(userId).digest('hex')

  return new Promise(function (resolve, reject) {
    blobSvc.createContainerIfNotExists(userIdHash, function (error, result, response) {
      if (error) {
        reject(error)
      } else {
        resolve(userIdHash)
      }
    })
  })
}

const addBlob = async (userId, file) => {
  try {
    let containerName = await getContainer(userId)
    var fileNameHash = new Date().getTime() + '.' + file.originalname.split('.')[1]
    return await createBlockBlobFromLocalFile(containerName, fileNameHash, file.path)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  addBlob: addBlob
}
