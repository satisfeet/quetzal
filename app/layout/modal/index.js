var query   = require('query');
var domify  = require('domify');
var emitter = require('emitter');

var modal = require('./modal');

function Modal() {
  this.element = query('.modal');

  if (!this.element) {
    this.element = domify(modal());

    document.body.appendChild(this.element);
  }

  bindToButtonClickEvent(this.element, this);
}

emitter(Modal.prototype);

Modal.prototype.open = function() {
  this.opened = true;

  this.element.className = 'modal modal-open show fade in';

  return this.emit('opened');
};

Modal.prototype.close = function() {
  this.opened = false;

  this.element.className = 'modal modal-open hidden fade out';

  return this.emit('closed');
};

Modal.prototype.insert = function(element) {
  var content = this.element.querySelector('.modal-body');

  if (content.lastElementChild) {
    content.lastElementChild.remove();
  }
  content.appendChild(element);

  return this;
};

module.exports = Modal;

function bindToButtonClickEvent(element, view) {
  element.querySelector('.close').addEventListener('click', function(e) {
    view.close();
  });
}
