import domify from 'domify';

import form from './form';

function Form(model) {
  this.element = domify(form(model));

  bindToSubmitEvent(this.element, model, this);
}

Form.prototype.resolve = function() {
  var element = this.element;

  return {
    name: element.name.value
  };
};

export default Form;

function bindToSubmitEvent(element, model, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve(), view);
  });
}
