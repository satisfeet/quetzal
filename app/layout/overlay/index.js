var query   = require('query');
var domify  = require('domify');
var emitter = require('emitter');

var section = require('./section');

function Overlay() {
  this.element = query('.overlay');

  if (!this.element) {
    this.element = domify(section());

    document.body.appendChild(this.element);
  }
}

emitter(Overlay.prototype);

Overlay.prototype.fade = function() {
  var element = this.element;

  element.classList.remove('hidden');
  setTimeout(function() {
    element.classList.add('overlay-fade')
  }, 500);

  return this;
};

Overlay.prototype.open = function(element) {
  this.opened = true;
  this.insert(element).fade();

  return this.emit('opened');
};

Overlay.prototype.close = function() {
  this.opened = false;
  this.element.classList.remove('overlay-fade')
  this.element.classList.add('hidden');

  return this.emit('closed');
};

Overlay.prototype.insert = function(element) {
  if (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }
  this.element.appendChild(element);

  return this;
};

module.exports = Overlay;
