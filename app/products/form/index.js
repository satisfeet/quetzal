import domify  from 'domify';
import emitter from 'emitter';

import form from './form';

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

export default Form;

function bindToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve(), view);
  });
}
