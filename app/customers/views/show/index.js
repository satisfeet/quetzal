var query   = require('query');
var domify  = require('domify');
var events  = require('events');
var emitter = require('emitter');

var template = require('./template.jade');

function Show(model) {
  this.model = model;

  this.element = query('#customers-show') || domify(template({
    customer: model.toJSON()
  }));

  this.events = events(this.element, this);
  this.events.bind('input', 'onInput');
  this.events.bind('click .close', 'onClose');
  this.events.bind('click .btn-danger', 'onDanger');
  this.events.bind('click .btn-primary', 'onPrimary');
  this.events.bind('click .btn-default', 'onDefault');
}

emitter(Show.prototype);

Show.prototype.show = function(selector, state) {
  var method = state ? 'remove' : 'add';

  query(selector, this.element).classList[method]('hidden');

  return this;
};

Show.prototype.onClose = function(e) {
  this.show('.close', false);
  this.show('.btn-danger', true);
  this.show('.btn-default', true);
};

Show.prototype.onInput = function(e) {
  var name = e.target.dataset.name;
  var value = e.target.textContent;

  this.model.set(name, value);

  this.show('.btn-primary', true);
  this.show('.btn-default', true);
};

Show.prototype.onDanger = function(e) {
  var self = this;

  this.model.remove(function(err) {
    if (err) throw err;

    self.emit('delete', self.model);
  });
};

Show.prototype.onPrimary = function(e) {
  var self = this;

  this.model.persist(function(err) {
    if (err) throw err;

    self.emit('update', self.model);
  });
};

Show.prototype.onDefault = function(e) {
  this.show('.close', true);
  this.show('.btn-danger', false);
  this.show('.btn-primary', false);
  this.show('.btn-default', false);
};

module.exports = Show;
