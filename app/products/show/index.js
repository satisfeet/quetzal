var clone = require('clone');
var domify = require('domify');
var emitter = require('emitter');

var show = require('./show');

function Detail(model) {
  model = clone(model);

  this.element = domify(show({
    product: model
  }));

  bindToInputEvent(this.element, model, this);
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

  return this;
};

Detail.prototype.hideActions = function() {
  this.element.querySelector('#actions').classList.add('hidden');

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

function bindToSubmitClickEvent(element, model, view) {
  element.querySelector('#submit').addEventListener('click', function(e) {
    view.emit('submit', model);
  });
}
