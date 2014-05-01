var page       = require('page');
var superagent = require('superagent');

var Table = require('table');

var element = document.querySelector('main');

page('/customers', function(context, next) {
  var customers = [
    { name: 'Bodo Kaiser', email: 'i@bodokaiser.io' },
    { name: 'Edison Trent', email: 'edison@yahoo.com' }
  ];

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }
  element.appendChild(new Table().list(customers).element);
});

page();

console.log('booted');
