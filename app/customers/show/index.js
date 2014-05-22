var clone   = require('clone');
var domify  = require('domify');
var emitter = require('emitter');

var show = require('./show');

function Show(model) {
  // do not overwrite the source model!
  model = clone(model);

  this.element = domify(show({
    customer: model
  }));

  bindToInputEvent(this.element, model, this);
  bindToSubmitClickEvent(this.element, model, this);
  bindToCancelClickEvent(this.element, model, this);
}

emitter(Show.prototype);

Show.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Show.prototype.showActions = function() {
  this.element.querySelector('#actions').classList.remove('hidden');

  return this;
};

module.exports = Show;

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
    view.emit('submit', model);
  });
}

function bindToCancelClickEvent(element, model, view) {
  element.querySelector('#cancel').addEventListener('click', function(e) {
    view.emit('cancel', model);
  });
};