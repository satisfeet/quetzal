var domify = require('domify');

var template = require('./template');

function Item(model) {
  this.element = domify(template({
    customer: model.toJSON()
  }));
}

module.exports = Item;
