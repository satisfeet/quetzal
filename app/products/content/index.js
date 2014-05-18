var domify  = require('domify');
var emitter = require('emitter');
var replace = require('replace');

var content = require('./content');

function Content() {
  this.element = domify(content());

  bindToCreateClickEvent(this.element, this);
}

emitter(Content.prototype);

Content.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

module.exports = Content;

function bindToCreateClickEvent(element, view) {
  element.querySelector('#create').addEventListener('click', function(e) {
    view.emit('create');
  });
}
