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
  this.list(models);

  bindToInputEvent(this.element, models, this);
}

Table.prototype.empty = function() {
  var element = this.element.querySelector('tbody');

console.log(this.element);
  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return this;
};

Table.prototype.list = function(models, filter) {
  if (filter) models = models.filter(filter);

  models.forEach(this.add, this);

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

function bindToInputEvent(element, models, view) {
  element.querySelector('form').addEventListener('input', function(e) {
    console.log('input', e.target.value)
    var regex = new RegExp(e.target.value);

    view.empty();
    view.list(models, function(model) {
      return Object.keys(model)
        .map(function(key) {
          return model[key];
        })
        .some(function(value) {
          return regex.test(value);
        });
    });
  });
}

function bindToSubmitEvent(element, models, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    console.log('not yet implemented...');
  });
}
