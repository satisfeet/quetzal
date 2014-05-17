var clone   = require('clone');
var domify  = require('domify');
var emitter = require('emitter');

var section = require('./section');

function Section(model) {
  // do not overwrite the source model!
  model = clone(model);

  this.element = domify(section({
    customer: model
  }));

  bindToInputEvent(this.element, model, this);
  bindToSubmitClickEvent(this.element, model, this);
  bindToCancelClickEvent(this.element, model, this);
  bindToUpdateClickEvent(this.element, model, this);
  bindToDestroyClickEvent(this.element, model, this);
}

emitter(Section.prototype);

Section.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Section.prototype.showActions = function() {
  this.element.querySelector('#actions').classList.add('hidden');
  this.element.querySelector('#controls').classList.remove('hidden');

  return this;
};

Section.prototype.hideActions = function() {
  this.element.querySelector('#actions').classList.remove('hidden');
  this.element.querySelector('#controls').classList.add('hidden');

  return this;
};

module.exports = Section;

function bindToInputEvent(element, model, view) {
  element.addEventListener('input', function(e) {
    if (~['street', 'city', 'zip'].indexOf(e.target.id)) {
      model.address[e.target.id] = e.target.textContent;
    } else {
      model[e.target.id] = e.target.textContent;
    }

    view.showActions();
  });
}

function bindToSubmitClickEvent(element, model, view) {
  element.querySelector('#submit').addEventListener('click', function(e) {
    view.emit('change', model, view);

    view.hideActions();
  });
}

function bindToCancelClickEvent(element, model, view) {
  element.querySelector('#cancel').addEventListener('click', function(e) {
    // TODO: reset content back to origin model state

    view.hideActions();
  });
};

function bindToUpdateClickEvent(element, model, view) {
  element.querySelector('#update').addEventListener('click', function(e) {
    view.emit('update', model, view);
  });
}

function bindToDestroyClickEvent(element, model, view) {
  element.querySelector('#destroy').addEventListener('click', function(e) {
    view.emit('destroy', model, view);
  });
}