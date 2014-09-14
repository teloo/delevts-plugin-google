var VALID_CODE = 'VALID CODE';

var rl = {
  question: function(message, callback) {
    if (message !== 'Input code: ') {
      throw new Error('message is not valid');
    }
    callback(VALID_CODE);
  },
  close: function() {
  }
};

exports.createInterface = function(prop) {
  if (prop.input !== process.stdin || prop.output !== process.stdout) {
    throw new Error('prop is not valid');
  }
  return rl;
};
