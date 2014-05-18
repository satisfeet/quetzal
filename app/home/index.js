var page    = require('page');
var replace = require('replace');

var List   = require('./list');
var Layout = require('./layout');

page('/', function() {
  var list = new List();
  var layout = new Layout();

  replace('#content', layout.insert(list.element).element);
});
