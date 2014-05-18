var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function Form(model) {
  this.element = domify(form({
    product: model
  }));

  bindToSubmitEvent(this.element, model, this);
}

emitter(Form.prototype);

module.exports = Form;

function bindToSubmitEvent(element, model, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    model.name = element.name.value;

    view.emit('submit', model, view);
  });
}