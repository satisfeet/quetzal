import domify  from 'domify';
import emitter from 'emitter';

import form from './form';

function Confirm(model) {
  this.element = domify(form({
    customer: model
  }));

  bindToSubmitEvent(this.element, this);
  bindToClickButtonEvent(this.element, this);
}

emitter(Confirm.prototype);

Confirm.prototype.resolve = function(e) {
  return {
    id: this.element.dataset.id
  };
};

export default Confirm;

function bindToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve());
  });
}

function bindToClickButtonEvent(element, view) {
  element.querySelector('.btn-default')
    .addEventListener('click', function(e) {
      e.preventDefault();

      view.emit('cancel', view.resolve());
    });
}
