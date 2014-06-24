var query  = require('query');
var domify = require('domify');

var template = require('./template');

function List(collection) {
  this.element = domify(template({
    products: collection
  }));
}

module.exports = List;
