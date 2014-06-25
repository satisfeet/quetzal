var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template');

function Show(model) {
  this.element = query('#products-show') || domify(template({
    product: model.toJSON()
  }));

  this.closeBtn = query('.close', this.element);
  this.dangerBtn = query('.btn-danger', this.element);
  this.primaryBtn = query('.btn-primary', this.element);
  this.defaultBtn = query('.btn-default', this.element);

  bindToInput(this.element, model, this);
  bindToClicks(this.element, model, this);
}

emitter(Show.prototype);

Show.prototype.alert = function(error) {
  var element = this.element.querySelector('.alert');

  toggle(element, !!error);

  if (error) element.innerText = error;
};

Show.prototype.toggleUpdate = function(state) {
  toggle(this.primaryBtn, state);
  toggle(this.defaultBtn, state);
};

Show.prototype.toggleDelete = function(state) {
  toggle(this.closeBtn, !state);
  toggle(this.dangerBtn, state);
  toggle(this.defaultBtn, state);
};

module.exports = Show;

function toggle(element, state) {
  var method = state ? 'remove' : 'add';

  element.classList[method]('hidden');
}

function bindToInput(element, model, view) {
  delegate.bind(element, '[contenteditable="true"]', 'input', function(e) {
    var key = e.target.id.replace('-', '.');
    var value = e.target.textContent;

    if (!key.indexOf('variations')) {
      value = value.split(', ');
    }

    model.set(key, value);

    view.toggleUpdate(true);
  });
}

function bindToClicks(element, model, view) {
  delegate.bind(element, 'button', 'click', function(e) {
    if (e.target.isSameNode(view.closeBtn)) {
      view.toggleDelete(true);
    }
    if (e.target.isSameNode(view.dangerBtn)) {
      view.emit('delete', model);
    }
    if (e.target.isSameNode(view.primaryBtn)) {
      view.emit('update', model);

      view.toggleUpdate(false);
    }
    if (e.target.isSameNode(view.defaultBtn)) {
      view.toggleUpdate(false);
      view.toggleDelete(false);
    }
  });
}
