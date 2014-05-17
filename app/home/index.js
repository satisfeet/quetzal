var page   = require('page');
var layout = require('layout');

var List    = require('./list');
var Content = require('./content');

page('/', function() {
  var list    = new List();
  var content = new Content();

  content.append(list.element);
  layout.content.insert(content.element);
});
