var query   = require('query');
var events  = require('events');
var domify  = require('domify');
var emitter = require('emitter');

var template = require('./template.jade');

function List(collection) {
  this.element = query('#customers-list') || domify(template({
    customers: collection
  }));

  this.events = events(this.element, this);
  this.events.bind('click tbody > tr');
}

emitter(List.prototype);

List.prototype.onclick = function(e) {
  this.emit('click', e.delegateTarget.dataset.id);
};

module.exports = List;
