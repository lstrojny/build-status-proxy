/* global it,describe */
var assert = require('assert'),
    Merger = require('../src/merger');

describe('Merger', function () {
  describe('merges', function () {
    var merger = new Merger();
    it('two single build results', function () {
      assert.equal(
        '<Projects><Project name="one"/><Project name="two"/></Projects>',
        merger.merge('<Projects><Project name="one"/></Projects>', '<Projects><Project name="two"/></Projects>')
      );
    });

    it('a multiple and a single build result', function () {
      assert.equal(
        '<Projects><Project name="one"/><Project name="two"/><Project name="three"/></Projects>',
        merger.merge(
          '<Projects><Project name="one"/><Project name="two"/></Projects>',
          '<Projects><Project name="three"/></Projects>'
        )
      );
    });

    it('a multiple and a single build result', function () {
      assert.equal(
        '<Projects><Project name="one"/><Project name="two"/><Project name="three"/><Project name="four"/></Projects>',
        merger.merge(
          '<Projects><Project name="one"/><Project name="two"/></Projects>',
          '<Projects><Project name="three"/><Project name="four"/></Projects>'
        )
      );
    });

    it('two empty build results', function () {
      assert.equal(
        '<Projects></Projects>',
        merger.merge('', '')
      );
    });
    it('two undefined build results', function () {
      assert.equal('<Projects></Projects>', merger.merge(undefined, undefined));
    });
    it('result containing newlines', function () {
      assert.equal(
        '<Projects>\n<Project name="one"/></Projects>',
        merger.merge('', '<Projects>\n<Project name="one"/></Projects>')
      );
    });
  });
});
