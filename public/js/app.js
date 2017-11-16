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

function callApiWithAccessToken(accessToken, url, requestMethod, data, callback) {
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
    if (callback) callback(data)
  })
    .fail(function (jqXHR, textStatus) {
      console.log('Error calling the Web api:\n' + textStatus)
    })
}

function getDocument() {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    callApiWithAccessToken(aadAccessToken, '/api/documents/' + '5a0cd3e1de3f740316dd2e52', 'GET')
  }
}

function updateDocumentList(data, removeExisting) {
  var cList = $('#documents')
  if (removeExisting) cList.empty();
  $.each(data, function (i) {
    var li = $('<li/>', { html: data[i].document.name })
      .addClass('list-group-item')
      .attr('role', 'menuitem')
      .attr('id', 'doc' + data[i].document._id)
      .appendTo(cList);
    $('<p/>', { html: data[i].access })
      .appendTo(li);
    var onclickHandler = "getHistory('" + data[i].document._id + "')";
    $('<a onclick=' + onclickHandler + '/>')
      .text("Get transaction history")
      .appendTo(li);
    $('<a/>')
      .text("Update")
      .appendTo(li);
    $('<ul/>')
      .attr('id', 'history' + data[i].document._id)
      .appendTo(li);
  });
}

function getDocuments() {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    callApiWithAccessToken(aadAccessToken, '/api/documents/', 'GET', null, (data) => updateDocumentList(data, true))
  }
}

function getHistory(docId) {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  } else {
    callApiWithAccessToken(aadAccessToken, '/api/transactions/' + docId, 'GET', null, (data) => {
      var parent = $('#history' + docId);
      parent.empty();
      $.each(data, function (i) {
        $('<li/>', { html: 'Date - ' + data[i].created + '\tDocument hash - ' + data[i].documentHash + '\tTransaction hash - ' + data[i].transactionHash })
          .addClass('list-group-item')
          .attr('role', 'menuitem')
          .appendTo(parent);
          
      });
    })
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
        callApiWithAccessToken(aadAccessToken, "/api/documents", "POST", new FormData(this), (data) => updateDocumentList(data, false))
      }
      e.preventDefault();
    });
});