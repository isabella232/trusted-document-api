var aadConfig = {
  clientID: 'b4823fab-579c-4e74-b67e-90d628d02f94',
  authority: 'https://login.microsoftonline.com/tfp/mdfinancial1.onmicrosoft.com/B2C_1_signup',
  b2cScopes: ['openid']
}

var aadAccessToken, documentByteArray, fileName

var clientApplication = new Msal.UserAgentApplication(aadConfig.clientID, aadConfig.authority, function (errorDesc, token, error, tokenType) {
})

function login() {
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

function callApiWithAccessToken(accessToken, url, requestMethod, data) {
  // Call the Web API with the AccessToken
  $.ajax({
    type: requestMethod,
    url: url,
    data: data,
    processData: false,
    contentType: false,
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

function getWill() {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    callApiWithAccessToken(aadAccessToken, 'http://localhost:3000/api/documents', 'GET')
  }
}

$(function () {
  $('#uploadForm')
    .submit(function (e) {
      if (!aadAccessToken) {
        document.getElementById('authlabel').innerText = "You must log in first"
      }
      else {
        console.log(this);
        callApiWithAccessToken(aadAccessToken, "http://localhost:3000/api/documents", "POST", new FormData(this))
      }
      e.preventDefault();
    });
});