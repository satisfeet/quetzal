var domify = require('domify');

var item = require('./item');
var list = require('./list');

function Item(model) {
  this.element = domify(item({
    product: model
  }));
}

function List(models) {
  this.element = domify(list());

  this.list(models);
}

List.prototype.add = function(model) {
  this.element.querySelector('ul').appendChild(new Item(model).element);

  return this;
};

List.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

module.exports = List;
