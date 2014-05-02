var dom        = require('dom4');
var page       = require('page');
var query      = require('query');
var superagent = require('superagent');

var Table = require('table');

var element = query('main');

page('/customers', function(context, next) {
  var customers = [
    { name: 'Bodo Kaiser', email: 'i@bodokaiser.io' },
    { name: 'Edison Trent', email: 'edison@yahoo.com' }
  ];

  dom.replace(element, new Table().list(customers).element);
});

page();
