var checkstyleFormatter = require('checkstyle-formatter');

function nspJsonToCheckstyleXml(nspJson) {
  if (typeof nspJson === 'string') {
    nspJson = JSON.parse(nspJson);
  }

  if (!nspJson instanceof Array || nspJson.length === 0) {
    return checkstyleFormatter([]);
  }

  // Group by module@version, without repeating any advsiories for the same group
  var modules = {};
  nspJson.forEach(function(insecurity) {
    var id = insecurity.module + '@' + insecurity.version;

    if (!modules[id]) {
      modules[id] = [];
    }

    var message = insecurity.title + ' - ' + insecurity.advisory;
    if (modules[id].indexOf(message) === -1) {
      modules[id].push(message);
    }
  });

  // Convert to checkstyle format
  return checkstyleFormatter(
    Object.keys(modules).map(function(id) {
      return {
        filename: id,
        messages: modules[id].map(function(message) {
          return {
            line: '',
            column: '',
            severity: 'warning',
            message: message
          };
        })
      };
    })
  );
}

module.exports = nspJsonToCheckstyleXml;
