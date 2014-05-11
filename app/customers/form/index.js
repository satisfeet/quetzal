import query   from 'query';
import events  from 'events';
import domify  from 'domify';
import emitter from 'emitter';

import form from './form';

function Form(model) {
  this.element = domify(form(model));

  emitter(this);

  this.events = events(this.element, this);
  this.events.bind('submit form');
}

Form.prototype.onsubmit = function(e) {
  if (e) e.preventDefault();

  this.emit('submit', {
    name:  query('#name', this.element).value,
    email: query('#email', this.element).value,
    address: {
      street: query('#street', this.element).value,
      city:   query('#city', this.element).value,
      zip:    query('#zip', this.element).value
    }
  });
};

export default Form;
