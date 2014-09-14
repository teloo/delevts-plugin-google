var VALID_URL = 'VALID AUTH URL';

var open = function(url) {
  if (url !== VALID_URL) {
    throw new Error('url is not valid. url: ' + url);
  }
};

module.exports = open;
