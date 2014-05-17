var query   = require('query');
var domify  = require('domify');
var emitter = require('emitter');

function Content() {
  this.element = query('main');
}

emitter(Content.prototype);

Content.prototype.blur = function() {
  this.element.classList.toggle('blur');

  return this;
};

Content.prototype.insert = function(element) {
  var content = this.element.querySelector('#content');

  if (typeof element === 'string') {
    element = domify(element);
  }

  while (content.lastElementChild) {
    content.lastElementChild.remove();
  }
  content.appendChild(element);

  return this.emit('inserted');
};

module.exports = Content;
