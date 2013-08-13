var Merger = function () {};
Merger.prototype.merge = function (left, right) {
  var regex = /.*<Projects>([\s\S]*)<\/Projects>.*/m;
  return '<Projects>' + left.replace(regex, '$1') + right.replace(regex, '$1') + '</Projects>';
};

module.exports = Merger;
