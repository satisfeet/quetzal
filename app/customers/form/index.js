import domify  from 'domify';
import emitter from 'emitter';

import form from './form';

function Form(model) {
  this.element = domify(form(model));

  emitter(this);
  bindToSubmitEvent(this.element, this);
}

Form.prototype.resolve = function() {
  var element = this.element;

  var entity = {
    name:  element.name.value,
    email: element.email.value,
  };

  if (element.city.value) {
    entity.address = {
      city: element.city.value
    };
    if (element.street.value && element.zip.value) {
      entity.address.street = element.street.value;
      entity.address.zip = element.zip.value;
    }
  }

  return entity;
};

export default Form;

function bindToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve());
  });
}
