var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template.jade');

function List(collection) {
  this.element = query('#customers-list') || domify(template({
    customers: collection.map('toJSON').value()
  }));

  bindToClickEvent(this.element, collection, this);
}

emitter(List.prototype);

module.exports = List;

function bindToClickEvent(element, collection, view) {
  delegate.bind(element, 'tbody > tr', 'click', function(e) {
    var model = collection.find(function(model) {
      return e.delegateTarget.dataset.id === model.get('id');
    });

    view.emit('click', model);
  });
}
