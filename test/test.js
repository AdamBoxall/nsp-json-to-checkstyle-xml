var fs = require('fs');
var assert = require('assert');

var nspJsonToCheckstyleXml = require('../index');

describe("nspJsonToCheckstyleXml", function() {
  it("should convert JSON correctly into XML", function() {
    assert.equal(nspJsonToCheckstyleXml(fixture('/test/input.json')), fixture('/test/output.xml'));
  });
});

function fixture(filename) {
  return fs.readFileSync(process.cwd() + filename, 'utf8').trim();
}
