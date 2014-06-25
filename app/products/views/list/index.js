var query  = require('query');
var domify = require('domify');

var template = require('./template');

function List(collection) {
  this.element = query('#products-list') || domify(template({
    products: collection.map('toJSON').value()
  }));
}

module.exports = List;
