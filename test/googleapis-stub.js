var _ = require('underscore');

var VALID_CLIENT_ID = 'VALID CLIENT ID';
var VALID_CLIENT_SECRET = 'VALID CLIENT SECRET';
var VALID_REFRESH_TOKEN = 'VALID REFRESH TOKEN';
var VALID_CALENDAR_ID = 'VALID CALENDAR ID';
var VALID_AUTH_URL = 'VALID AUTH URL';
var VALID_CODE = 'VALID CODE';
var VALID_PAGE_TOKEN = 'VALID PAGE TOKEN';

var events = [];

var OAuth2 = function(clientId, clientSecret, redirectUrl) {
  if (clientId !== VALID_CLIENT_ID) {
    throw new Error('StubError: clientId is not valid');
  }
  if (clientSecret !== VALID_CLIENT_SECRET) {
    throw new Error('StubError: clientSecret is not valid');
  }
  
  this.generateAuthUrl = function(prop) {
    if (prop.access_type !== 'offline') {
      throw new Error('StubError: access_type is not offline');
    }
    if (prop.scope.length !== 1 && prop.scope[0] !== 'https://www.googleapis.com/auth/calendar') {
      throw new Error('StubError: scope is not calendar scope');
    }
    return VALID_AUTH_URL;
  };

  this.getToken = function(code, callback) {
    if (code !== VALID_CODE) {
      callback(new Error('StubError: code is not valid'));
      return;
    }
    callback(null, {
      refresh_token: VALID_REFRESH_TOKEN
    });
  };

  this.setCredentials = function(prop) {
    if (prop.refresh_token !== VALID_REFRESH_TOKEN) {
      throw new Error('prop.refresh_token is not valid');
    }
  };
};

var listCount = 1;
var gcalEvents = {
  list: function(params, callback) {
    if (params.calendarId !== VALID_CALENDAR_ID) {
      listCount = 1;
      callback(new Error('params.calendarId is not valid'));
      return;
    }
    if (params.pageToken !== undefined && params.pageToken !== VALID_PAGE_TOKEN) {
      listCount = 1;
      callback(new Error('params.pageToken is not valid'));
      return;
    }
    if (listCount === 1) {
      listCount++;
      callback(null, {
        items: events,
        nextPageToken: VALID_PAGE_TOKEN
      }, {});
      return;
    }
    listCount = 1;
    callback(null, {
      items: events
    }, {});
  },
  delete: function(params, callback) {
    if (params.calendarId !== VALID_CALENDAR_ID) {
      callback(new Error('params.calendarId is not valid'));
      return;
    }
    if (!params.eventId) {
      callback(new Error('params.eventId is needed'));
      return;
    }
    callback(null, {}, {});
  }
};

var gcal = {
  events: gcalEvents
};

var gCalendar = function(prop) {
  if (prop.version !== 'v3') {
    throw new Error('prop.version is not valid');
  }
  if (!prop.auth) {
    throw new Error('prop.auth is needed');
  }
  return gcal;
};

exports.auth = {
  OAuth2: OAuth2
};
exports.calendar = gCalendar;
