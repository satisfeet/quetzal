var auth   = require('auth');
var page   = require('page');
var rester = require('rester');

rester.use(bearer);

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