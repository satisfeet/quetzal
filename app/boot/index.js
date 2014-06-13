var page   = require('page');
var query  = require('query');
var modal  = require('modal');
var rester = require('rester');

rester.use(accept);

require('./modal');

require('home');
require('navbar');
require('products');
require('customers');

page();

function accept(request) {
  request.accept('json');
}
