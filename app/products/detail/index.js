import clone   from 'clone';
import domify  from 'domify';
import emitter from 'emitter';

import section from './section';

function Detail(model) {
  model = clone(model);

  this.element = domify(section({
    product: model
  }));

  bindToInputEvent(this.element, model, this);
  bindToButtonClickEvent(this.element, model, this);
}

Detail.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Detail.prototype.toggleActions = function() {
  if (!this.toggledActions) {
    this.element.querySelector('#actions').classList.toggle('hidden');
    this.element.querySelector('#controls').classList.toggle('hidden');
  }

  return this;
};

emitter(Detail.prototype);

export default Detail;

function bindToInputEvent(element, model, view) {
  element.addEventListener('input', function(e) {
    model[e.target.name] = e.target.value;

    view.toggleActions();
    view.toggledActions = true;
  });
}

function bindToButtonClickEvent(element, model, view) {
  element.querySelector('#controls .btn-danger')
    .addEventListener('click', function(e) {
      view.toggledActions = false;
      view.toggleActions();

      view.emit('submit', model, view);
    });
}
