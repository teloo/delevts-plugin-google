var readline = require('readline');
var _ = require('underscore');
var async = require('async');
var open = require('open');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

var deleteEvents = function(config, callback) {
  if (!config.clientId) {
    callback(new Error('Set clientId in the config file'));
    return;
  }
  if (!config.clientSecret) {
    callback(new Error('Set clientSecret in the config file'));
    return;
  }
  if (!config.calendarId) {
    callback(new Error('Set calendarId in the config file'));
    return;
  }

  if (config.refreshToken) {
    doDeleteEvents(config, callback);
  } else {
    displayRefreshToken(config, callback);
  }
};

var doDeleteEvents = function(config, callback) {
  var clientId = config.clientId;
  var clientSecret = config.clientSecret;
  var refreshToken = config.refreshToken;
  var calendarId = config.calendarId;

  var oauth2Client = new OAuth2(clientId, clientSecret, REDIRECT_URL);
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });
  var gcal = google.calendar({version: 'v3', auth: oauth2Client});

  listAllGcalEvents(gcal, calendarId, function(err, events) {
    if (err) {
      callback(err);
      return;
    }
    var ids = _.map(events, function(event) {
      return event.id;
    });
    deleteGcalEvents(gcal, calendarId, ids, function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, ids.length);
    });
  });
};

var listAllGcalEvents = function(gcal, calendarId, callback) {
  var events = [];
  var listGcalEventsCallback = function(err, evts, nextPageToken) {
    if (err) {
      callback(err);
      return;
    }
    events = events.concat(evts);
    if (nextPageToken) {
      listGcalEvents(gcal, calendarId, nextPageToken, listGcalEventsCallback);
      return;
    }
    callback(null, events);
  };

  listGcalEvents(gcal, calendarId, null, listGcalEventsCallback);
};

var listGcalEvents = function(gcal, calendarId, nextPageToken, callback) {
  var params = {
    calendarId: calendarId,
    pageToken: nextPageToken
  };
  if (!nextPageToken) {
    delete params.pageToken;
  }

  gcal.events.list(params, function(err, body, res) {
    if (err) {
      callback(new Error('Code: ' + err.code + ', Message: ' + err.message));
      return;
    }
    var events = _.reject(body.items, function(event) {
      return event.status === 'cancelled';
    });
    callback(null, events, body.nextPageToken);
  });
};

var deleteGcalEvents = function(gcal, calendarId, ids, callback) {
  var tasks = _.map(ids, function(id) {
    return function(cb) {
      deleteGCalEvent(gcal, calendarId, id, function(err) {
        if (err) {
          cb(err);
          return;
        }
        cb(null);
      });
    };
  });

  async.parallelLimit(tasks, 5, function(err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

var deleteGCalEvent = function(gcal, calendarId, id, callback) {
  gcal.events.delete({
    calendarId: calendarId,
    eventId: id
  }, function(err, body, res) {
    if (err) {
      callback(new Error('Code: ' + err.code + ', Message: ' + err.message));
      return;
    }
    callback(null);
  });
};

var displayRefreshToken = function(config, callback) {
  var clientId = config.clientId;
  var clientSecret = config.clientSecret;

  var oauth2Client = new OAuth2(clientId, clientSecret, REDIRECT_URL);
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar'
    ]
  });

  open(url);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Input code: ', function(code) {
    rl.close();
    if (!code) {
      callback(new Error('Not input code'));
    }

    oauth2Client.getToken(code, function(err, tokens) {
      console.log('refresh token: ' + tokens.refresh_token);
      console.log('Write refresh token to config file');
      callback(null, null);
    });
  });
};

exports.deleteEvents = deleteEvents;
