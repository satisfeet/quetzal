var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template.jade');

function Show(model) {
  this.element = query('#customers-show') || domify(template({
    customer: model.toJSON()
  }));

  bindToInput(this.element, model, this);
  bindToCloseClick(this.element, model, this);
  bindToDangerClick(this.element, model, this);
  bindToPrimaryClick(this.element, model, this);
  bindToDefaultClick(this.element, model, this);
}

emitter(Show.prototype);

Show.prototype.toggle = function(selector, state) {
  var element = this.element.querySelector(selector);

  element.classList[state ? 'remove' : 'add']('hidden');
};

Show.prototype.toggleUpdate = function(state) {
  this.toggle('.btn-primary', state);
  this.toggle('.btn-default', state);
};

Show.prototype.toggleDelete = function(state) {
  this.toggle('.close', !state);
  this.toggle('.btn-danger', state);
  this.toggle('.btn-default', state);
};

module.exports = Show;

function bindToInput(element, model, view) {
  delegate.bind(element, '[contenteditable="true"]', 'input', function(e) {
    model.set(e.target.dataset.name, e.target.textContent);

    view.toggleUpdate(true);
  });
}

function bindToCloseClick(element, model, view) {
  delegate.bind(element, '.close', 'click', function(e) {
    view.toggleDelete(true);
  });
}

function bindToDangerClick(element, model, view) {
  delegate.bind(element, '.btn-danger', 'click', function(e) {
    model.remove(function(err) {
      if (err) throw err;

      view.emit('delete', model);
    });
  });
}

function bindToPrimaryClick(element, model, view) {
  delegate.bind(element, '.btn-primary', 'click', function(e) {
    model.update(function(err) {
      if (err) throw err;

      view.emit('update', model);
    });
  });
}

function bindToDefaultClick(element, model, view) {
  delegate.bind(element, '.btn-default', 'click', function(e) {
    view.toggleUpdate(false);
    view.toggleDelete(false);
  });
}
