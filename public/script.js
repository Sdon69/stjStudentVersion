





// Bind handlers when the page loads.
$(function() {
  $('a.mdl-button').click(function() {
    setSpinnerActive(true);
  });
});



function setSpinnerActive(isActive) {
  if (isActive) {
    $('#spinner').addClass('is-active');
  } else {
    $('#spinner').removeClass('is-active');
  }
}

function showError(error) {
  console.log(error);
  var snackbar = $('#snackbar');
  snackbar.addClass('error');
  snackbar.get(0).MaterialSnackbar.showSnackbar(error);
}

function showMessage(message) {
  var snackbar = $('#snackbar');
  snackbar.removeClass('error');
  snackbar.get(0).MaterialSnackbar.showSnackbar({
    message: message
  });
}

// Google Sign-in.

function onSignIn(user) {
      document.getElementById('idHeader').style = 'top:15000%;position:fixed;';
  var profile = user.getBasicProfile();
  $('#profile .name').text(profile.getName());
  $('#profile .email').text(profile.getEmail());
}

// Spreadsheet control handlers.

$(function() {
  $('button[rel="create"]').click(function() {
    makeRequest('POST', '/spreadsheets', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });
  $('button[rel="createAnnouncements"]').click(function() {

    makeRequest('POST', '/spreadsheetsAnnouncement', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="createNotes"]').click(function() {
    makeRequest('POST', '/spreadsheetsNotes', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="writeEvent"]').click(function() {
    makeRequest('POST', '/spreadsheetsCreateEvent', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="writeNotes"]').click(function() {
    makeRequest('POST', '/spreadsheetsCreateNote', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="writeAnnouncement"]').click(function() {
    makeRequest('POST', '/spreadsheetsCreateAnnouncement', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="writeUserId"]').click(function() {
    makeRequest('POST', '/spreadsheetsCreateUserId', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="getDataForUserId"]').click(function() {
    makeRequest('POST', '/spreadsheetsgetDataForUserId', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="editUserId"]').click(function() {
    makeRequest('POST', '/spreadsheetsEditUserId', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="signinUserId"]').click(function() {
    makeRequest('POST', '/spreadsheetsSigninUserId', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

  $('button[rel="appendAttendance"]').click(function() {
    makeRequest('POST', '/spreadsheetsAppendAttendance', function(err, spreadsheet) {
      if (err) return showError(err);
      // window.location.reload();
    });
  });

});

function makeRequest(method, url, callback) {
  var auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {

          document.getElementById('idHeader').style = 'height:100%;';

    return callback(new Error('Signin required.'));

  }else{
    document.getElementById('idHeader').style = 'top:15000%;position:fixed;';
  }

  var accessToken = auth.currentUser.get().getAuthResponse().access_token;
  setSpinnerActive(true);
  $.ajax(url, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    success: function(response) {
      setSpinnerActive(false);

      return callback(null, response);
    },
    error: function(response) {
      setSpinnerActive(false);
      return callback(new Error(response.responseJSON.message));
    }
  });
}
