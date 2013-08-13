var Q = require('q'),
  HTTP = require('q-io/http');

module.exports = function (params) {
  if (!params.username) {
    throw 'Property "username" must be set';
  }

  return HTTP.read('https://api.travis-ci.org/repos/?owner_name=' + params.username).then(function (repos) {
    return Q.all(JSON.parse(repos + '').map(function (repo) {
      return HTTP.read('https://api.travis-ci.org/repositories/' + repo.slug + '/cc.xml').then(function (resp) {
        return resp + '';
      });
    }));
  });
};
