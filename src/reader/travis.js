var Q = require('q'),
  HTTP = require('q-io/http');

module.exports = function (params) {
  if (!params.username) {
    throw 'Property "username" must be set';
  }

  return HTTP.read('https://api.travis-ci.org/repos/?owner_name=' + params.username).then(function(v) {
    return Q.all(JSON.parse(v + '').map(function (repo) {
      return HTTP.read('https://api.travis-ci.org/repositories/' + repo.slug + '/cc.xml').then(function (resp) {
        return resp + '';
      });
    }));
  });
};
