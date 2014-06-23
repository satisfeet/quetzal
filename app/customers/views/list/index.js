var Item     = require('item');
var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template.jade');

function List(collection) {
  this.element = query('#customers-list') || domify(template({
    customers: collection.map('toJSON').value()
  }));

  bindToTableRowClick(this.element, collection, this);
}

emitter(List.prototype);

List.prototype.empty = function(collection) {
  var element = this.element.querySelector('table > tbody');

  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
};

List.prototype.append = function(model) {
  var element = this.element.querySelector('table > tbody');

  element.appendChild(new Item(model).element);
};

module.exports = List;

function bindToTableRowClick(element, collection, view) {
  delegate.bind(element, 'tbody > tr', 'click', function(e) {
    var model = collection.find(function(model) {
      return e.delegateTarget.dataset.id === model.get('id');
    });

    view.emit('click', model);
  });
}
