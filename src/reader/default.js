var HTTP = require('q-io/http');

module.exports = function (params) {
  var req;

  if (!params.url) {
    throw 'Property "url" must be set';
  }

  req = HTTP.normalizeRequest(params.url);

  if (params.username && params.password) {
    req.headers.authorization = 'Basic ' + new Buffer(params.username + ':' + params.password).toString('base64');
  }

  return HTTP.read(req).then(function (resp) {
    return [resp + ''];
  });
};
