var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function Confirm(model) {
  this.element = domify(form({
    customer: model
  }));

  bindToSubmitEvent(this.element, model, this);
}

emitter(Confirm.prototype);

module.exports = Confirm;

function bindToSubmitEvent(element, model, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', model, view);
  });
}
