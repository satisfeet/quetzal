var clone = require('clone');
var domify = require('domify');
var emitter = require('emitter');

var section = require('./section');

function Detail(model) {
  model = clone(model);

  this.element = domify(section({
    product: model
  }));

  bindToInputEvent(this.element, model, this);
  bindToUpdateClickEvent(this.element, model, this);
  bindToRemoveClickEvent(this.element, model, this);
  bindToSubmitClickEvent(this.element, model, this);
}

Detail.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Detail.prototype.showActions = function() {
this.element.querySelector('#actions').classList.remove('hidden');
this.element.querySelector('#controls').classList.add('hidden');

  return this;
};

Detail.prototype.hideActions = function() {
  this.element.querySelector('#actions').classList.add('hidden');
  this.element.querySelector('#controls').classList.remove('hidden');

  return this;
};

emitter(Detail.prototype);

module.exports = Detail;

function bindToInputEvent(element, model, view) {
  element.addEventListener('input', function(e) {
    model[e.target.name] = e.target.value;

    view.showActions();
  });
}

function bindToUpdateClickEvent(element, model, view) {
  element.querySelector('#update').addEventListener('click', function(e) {
    view.emit('update', model, view);
  });
}

function bindToRemoveClickEvent(element, model, view) {
  element.querySelector('#remove').addEventListener('click', function(e) {
    view.emit('remove', model, view);
  });
}

function bindToSubmitClickEvent(element, model, view) {
  element.querySelector('#submit').addEventListener('click', function(e) {
    view.emit('submit', model, view);
  });
}