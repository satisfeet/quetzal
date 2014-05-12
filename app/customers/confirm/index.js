import domify  from 'domify';
import events  from 'events';
import emitter from 'emitter';

import form from './form';

function Confirm(model) {
  this.element = domify(form(model));

  emitter(this);

  this.events = events(this.element, this);
  this.events.bind('submit form');
  this.events.bind('click .btn-default');
}

Confirm.prototype.onclick = function(e) {
  if (e) e.preventDefault();

  return this.emit('cancel', {
    id: this.element.dataset.id
  });
};

Confirm.prototype.onsubmit = function(e) {
  if (e) e.preventDefault();

  return this.emit('submit', {
    id: this.element.dataset.id
  });
};

export default Confirm;
