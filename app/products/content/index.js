var domify  = require('domify');
var emitter = require('emitter');

var content = require('./content');

function Content() {
  this.element = domify(content());

  bindToCreateClickEvent(this.element, this);
}

emitter(Content.prototype);

Content.prototype.empty = function() {
  var element = this.element.querySelector('#content-inner');

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return this;
};

Content.prototype.append = function(element) {
  this.element.querySelector('#content-inner').appendChild(element);

  return this;
};

module.exports = Content;

function bindToCreateClickEvent(element, view) {
  element.querySelector('#create').addEventListener('click', function(e) {
    view.emit('create');
  });
}