require('js-yaml');

var http = require('http'),
  Q = require('q'),
  merger = new (require('./merger'))(),
  config = require('../config.yml'),
  microtime = function () { return new Date().getTime(); };

(http.createServer(function (req, resp) {
  var promises = [],
    start = microtime();

  Object.keys(config.sources || {}).forEach(function (key) {
    var reader = require('./reader/' + config.sources[key].reader);
    promises.push(reader(config.sources[key]));
  });

  Q.all(promises)
    .then(function (payloads) {
      var flat = [];
      return flat.concat.apply(flat, payloads);
    }, function (err) {
      console.log('ERR ' + err);
    })
    .then(function (payloads) {
      console.log('Fetched ' + payloads.length + ' resources in ' + (microtime() - start) + ' ms');
      return payloads.reduce(merger.merge, '');
    })
    .then(function (xml) {
      resp.writeHead(200, {'Content-Type': 'text/xml'});
      resp.end(xml);
    }, function (err) {
      console.log('ERR: ' + err);
      resp.writeHead(200, {'Content-Type': 'text/xml'});
      resp.end('<Projects/>');
    });
})).listen(8080);
