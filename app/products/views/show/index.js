var query  = require('query');
var domify = require('domify');

var template = require('./template');

function Show(model) {
  this.element = domify(template({
    product: model
  }));
}

module.exports = Show;
