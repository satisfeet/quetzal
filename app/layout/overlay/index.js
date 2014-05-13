import query   from 'query';
import domify  from 'domify';
import emitter from 'emitter';

import section from './section';

function Overlay() {
  this.element = query('.overlay');

  if (!this.element) {
    this.element = domify(section());

    document.body.appendChild(this.element);
  }

  emitter(this);
}

Overlay.prototype.fade = function() {
  var element = this.element;

  element.classList.remove('hidden');
  setTimeout(function() {
    element.classList.add('overlay-fade')
  }, 500);

  return this;
};

Overlay.prototype.open = function(element) {
  this.insert(element).fade();

  return this.emit('opened');
};

Overlay.prototype.close = function() {
  this.element.classList.remove('overlay-fade')
  this.element.classList.add('hidden');

  return this.emit('closed');
};

Overlay.prototype.insert = function(el) {
  var element = query('.overlay-inner', this.element);

  if (element.lastElementChild) {
    element.lastElementChild.remove();
  }
  element.appendChild(el);

  return this;
};

export default Overlay;
