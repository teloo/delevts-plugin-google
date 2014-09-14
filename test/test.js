var expect = require('expect.js');
var proxyquire = require('proxyquire');
var pluginGoogle = proxyquire('../lib', {
  'googleapis': require('./googleapis-stub'),
  'open': require('./open-stub'),
  'readline': require('./readline-stub')
});

var VALID_CLIENT_ID = 'VALID CLIENT ID';
var VALID_CLIENT_SECRET = 'VALID CLIENT SECRET';
var VALID_REFRESH_TOKEN = 'VALID REFRESH TOKEN';
var VALID_CALENDAR_ID = 'VALID CALENDAR ID';

describe('deleteEvents (common)', function() {
  beforeEach(function(done) {
    done();
  });

  it('cause error when clientId is undefined', function(done) {
    pluginGoogle.deleteEvents({
      clientId: undefined,
      clientSecret: VALID_CLIENT_SECRET,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err.message).to.be('Set clientId in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when clientId is null', function(done) {
    pluginGoogle.deleteEvents({
      clientId: null,
      clientSecret: VALID_CLIENT_SECRET,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err.message).to.be('Set clientId in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when clientSecret is undefined', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: undefined,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err.message).to.be('Set clientSecret in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when clientSecret is null', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: null,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err.message).to.be('Set clientSecret in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when calendarId is undefined', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: VALID_CLIENT_SECRET,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: undefined
    }, function(err, count) {
      expect(err.message).to.be('Set calendarId in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when calendarId is null', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: VALID_CLIENT_SECRET,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: null
    }, function(err, count) {
      expect(err.message).to.be('Set calendarId in the config file');
      expect(count).to.be(undefined);
      done();
    });
  });
});

describe('deleteEvents (get refresh token)', function() {
  beforeEach(function(done) {
    done();
  });

  it('get refresh token', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: VALID_CLIENT_SECRET,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(null);
      done();
    });
  });
});

describe('deleteEvents (delete all events)', function() {
  beforeEach(function(done) {
    done();
  });

  it('delete all events', function(done) {
    pluginGoogle.deleteEvents({
      clientId: VALID_CLIENT_ID,
      clientSecret: VALID_CLIENT_SECRET,
      refreshToken: VALID_REFRESH_TOKEN,
      calendarId: VALID_CALENDAR_ID
    }, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(0);
      done();
    });
  });
});
