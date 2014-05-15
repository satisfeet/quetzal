import clone   from 'clone';
import domify  from 'domify';
import emitter from 'emitter';

import article from './article';

function Article(model) {
  // do not overwrite the source model!
  model = clone(model);

  this.element = domify(article({
    customer: model
  }));

  bindToInputEvent(this.element, model, this);
  bindToButtonClickEvents(this.element, model, this);
}

emitter(Article.prototype);

Article.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Article.prototype.toggleActions = function() {
  if (!this.toggledActions) {
    this.element.querySelector('#actions').classList.toggle('hidden');
    this.element.querySelector('#controls').classList.toggle('hidden');
  }

  return this;
};

export default Article;

function bindToInputEvent(element, model, view) {
  element.addEventListener('input', function(e) {
    if (~['street', 'city', 'zip'].indexOf(e.target.id)) {
      model.address[e.target.id] = e.target.textContent;
    } else {
      model[e.target.id] = e.target.textContent;
    }

    view.toggleActions();
    view.toggledActions = true;
  });
}

function bindToButtonClickEvents(element, model, view) {
  element.querySelector('button.btn-danger')
    .addEventListener('click', function(e) {
      view.emit('submit', model);

      view.toggledActions = false;
      view.toggleActions();
    });
  element.querySelector('button.btn-default')
    .addEventListener('click', function(e) {
      view.emit('reset', model);
    });
}