var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function Confirm(model) {
  this.element = domify(form({
    customer: model
  }));

  bindToSubmitEvent(this.element, this);
}

emitter(Confirm.prototype);

Confirm.prototype.resolve = function(e) {
  return {
    id: this.element.dataset.id
  };
};

module.exports = Confirm;

function bindToSubmitEvent(element, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve(), view);
  });
}