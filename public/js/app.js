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

function callApiWithAccessToken(url, requestMethod, data, callback) {
  if (!aadAccessToken) {
    document.getElementById('authlabel').innerText = 'You must log in first'
  }
  $.ajax({
    type: requestMethod,
    url: url,
    data: data,
    processData: false,
    contentType: false,
    headers: {
      'Authorization': 'Bearer ' + aadAccessToken
    }
  }).done(function (data) {
    if (callback) callback(data)
  })
    .fail(function (jqXHR, textStatus) {
      console.log('Error calling the Web api:\n' + textStatus)
    })
}


function updateDocumentList(data, removeExisting) {
  var ul = $('#documents')
  if (removeExisting) ul.empty();
  $.each(data, function (i) {

    var li = $('<li/>', { html: data[i].document.name })
      .addClass('list-group-item')
      .attr('role', 'menuitem')
      .attr('id', 'doc' + data[i].document._id)

    if ($('#doc' + data[i].document._id).length) {
      $('#doc' + data[i].document._id).replaceWith(li);
    }
    else {
      li.appendTo(ul);
    }

    $('<p/>', { html: data[i].access })
      .appendTo(li);
    var onclickHandler = "getHistory('" + data[i].document._id + "')";
    $('<a onclick=' + onclickHandler + '/>')
      .text("Get transaction history")
      .attr('class', "btn btn-default")
      .appendTo(li);

    var form = $('<form/>')
      .attr('id', 'form' + data[i].document._id)
      .appendTo(li);

    $(' <input type="file" class="input-file"  name="document" />')
      .appendTo(form);
    $('<input type="submit" class="btn btn-default" value="Update"/>')
      .appendTo(form);
    $('<ul/>')
      .attr('id', 'history' + data[i].document._id)
      .appendTo(li);

    form
      .submit(function (e) {
        callApiWithAccessToken("/api/documents/" + data[i].document._id, "POST", new FormData(this), (data) => updateDocumentList(data, false))
        e.preventDefault();
      });

  });
}

function getDocuments() {
  callApiWithAccessToken('/api/documents/', 'GET', null, (data) => updateDocumentList(data, true))

}

function getHistory(docId) {
  callApiWithAccessToken('/api/transactions/' + docId, 'GET', null, (data) => {
    var parent = $('#history' + docId);
    parent.empty();
    $.each(data, function (i) {
      $('<li/>', { html: '<b>Date</b> - ' + data[i].created + '\t<b>Document hash</b>  - ' + data[i].documentHash + '\t<b>Transaction hash</b>  - ' +
      '\t<a target="_blank" style="float:initial" href="https://rinkeby.etherscan.io/tx/' + data[i].txHash + '">' + data[i].txHash + '<a/> \t<b>Block number</b> - ' + data[i].blockNumber })
      
        .addClass('list-group-item')
        .attr('role', 'menuitem')
        .appendTo(parent);

    });
  })
}

$(function () {
  $('#uploadForm')
    .submit(function (e) {
      callApiWithAccessToken("/api/documents", "POST", new FormData(this), (data) => updateDocumentList(data, false))
      e.preventDefault();
    });
});