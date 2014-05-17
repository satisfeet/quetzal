var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function Form(model) {
  this.element = domify(form(model));

  bindToSubmitEvent(this.element, model, this);
}

emitter(Form.prototype);

Form.prototype.resolve = function() {
  var element = this.element.querySelector('form');

  return {
    name: element.name.value
  };
};

module.exports = Form;

function bindToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve(), view);
  });
}