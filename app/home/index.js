var page   = require('page');
var layout = require('layout');

var List = require('./list');

page('/', function() {
  layout.content.insert(List());
});