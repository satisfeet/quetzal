var auth   = require('auth');
var page   = require('page');
var query  = require('query');
var modal  = require('modal');
var rester = require('rester');

rester.use(bearer);

// for some reason it is not possible to use sub modules in boot
// setting up sub modules will cause "undefined" to be thrown...
modal.on('opened', function() {
  query('main').classList.add('blur');
});

modal.on('closed', function() {
  query('main').classList.remove('blur');
});

page(function(context, next) {
  modal.close();

  next();
});

require('auth');
require('navbar');

require('home');
require('products');
require('customers');

page();

function bearer(request) {
  var token = auth.token();

  if (token) request.set('Authorization', 'Bearer ' + token);
}
