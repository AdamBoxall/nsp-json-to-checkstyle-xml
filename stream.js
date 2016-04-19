#!/usr/bin/env node
var nspJsonToCheckstyleXml = require('./index');

var stdin = process.openStdin();
var nspJson = '';

stdin.on('data', function(chunk) {
  nspJson += chunk;
});

stdin.on('end', function() {
  console.log(nspJsonToCheckstyleXml(nspJson));
});
