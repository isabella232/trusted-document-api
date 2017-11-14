var aadConfig = {
  clientID: 'b4823fab-579c-4e74-b67e-90d628d02f94',
  authority: 'https://login.microsoftonline.com/tfp/mdfinancial1.onmicrosoft.com/B2C_1_signup',
  b2cScopes: ['openid']
}

var aadAccessToken, documentByteArray, fileName

var clientApplication = new Msal.UserAgentApplication(aadConfig.clientID, aadConfig.authority, function (errorDesc, token, error, tokenType) {
})

function login () {
  clientApplication.loginPopup(aadConfig.b2cScopes).then(function (idToken) {
    clientApplication.acquireTokenSilent(aadConfig.b2cScopes).then(function (accessToken) {
      var userName = clientApplication.getUser().name
      document.getElementById('authlabel').innerText = 'Hello ' + userName
      aadAccessToken = accessToken
    }, function (error) {
      clientApplication.acquireTokenPopup(aadConfig.b2cScopes).then(function (accessToken) {
                // do smth
      }, function (error) {
        console.log('Error acquiring the popup:\n' + error)
      })
    })
  }, function (error) {
    console.log('Error during login:\n' + error)
  })
}

function callApiWithAccessToken (accessToken, url, requestMethod, data) {
    // Call the Web API with the AccessToken
  $.ajax({
    type: requestMethod,
    url: url,
    data: data,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }).done(function (data) {
    console.log('Web APi returned:\n' + JSON.stringify(data))
  })
        .fail(function (jqXHR, textStatus) {
          console.log('Error calling the Web api:\n' + textStatus)
        })
}

function getWill () {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    callApiWithAccessToken(aadAccessToken, '/api/documents', 'GET')
  }
}

function uploadDocument () {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    if (!fileName || !documentByteArray) {
      document.getElementById('authlabel').innerText = 'You must select file first'
    } else {
      callApiWithAccessToken(aadAccessToken, '/api/documents', 'POST', { fileName: fileName, stream: documentByteArray })
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  var input = document.getElementById('file-input'),
    fileData // We need fileData to be visible to getBuffer.

    // Eventhandler for file input.
  function openfile (evt) {
    var files = input.files
        // Pass the file to the blob, not the input[0].
    fileName = files[0].name
    fileData = new Blob([files[0]])
        // Pass getBuffer to promise.
    var promise = new Promise(getBuffer)
        // Wait for promise to be resolved, or log error.
    promise.then(function (data) {
      documentByteArray = data
    }).catch(function (err) {
      console.log('Error: ', err)
    })
  }

    /*
      Create a function which will be passed to the promise
      and resolve it when FileReader has finished loading the file.
    */
  function getBuffer (resolve) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(fileData)
    reader.onload = function () {
      var arrayBuffer = reader.result
      var bytes = new Uint8Array(arrayBuffer)
      resolve(bytes)
    }
  }

    // Eventlistener for file input.
  input.addEventListener('change', openfile, false)
})
