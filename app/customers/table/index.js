var page   = require('page');
var domify = require('domify');

var row   = require('./row');
var table = require('./table');

function Row(model) {
  this.element = domify(row({
    customer: model
  }));

  bindToClickEvent(this.element, this);
}

function Table(models) {
  this.element = domify(table());
}

Table.prototype.empty = function() {
  var element = this.element.querySelector('tbody');

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return this;
};

Table.prototype.add = function(model) {
  this.element.querySelector('tbody').appendChild(new Row(model).element);

  return this;
};

module.exports = Table;

function bindToClickEvent(element, view) {
  element.addEventListener('click', function(e) {
    page('/customers/' + element.dataset.id);
  });
}