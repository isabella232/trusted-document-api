const azureStorage = require('azure-storage')
const blobSvc = azureStorage.createBlobService()
const crypto = require('crypto')

function getContainer(userId) {
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

const addBlob = async (userId, stream) => {
  let containerName = await getContainer(userId)
  var fileNameHash = new Date().getTime() + '.' + stream.filename.split(".")[1];
  var size = stream.byteCount - stream.byteOffset;
  console.log(containerName, fileNameHash, size)
  try {
    blobSvc.createBlockBlobFromStream(containerName, fileNameHash, stream, size, function (error, result, response) {
      console.log("Helllo!!!", error, result, response);
      if (!error) {
        // file uploaded
      }
    })
  }
  catch (e) {
    console.log(e);
  }
}
module.exports = {
  addBlob: addBlob
}
