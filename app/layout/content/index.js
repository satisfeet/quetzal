var query   = require('query');
var emitter = require('emitter');
var replace = require('replace');

function Content() {
  this.element = query('main');
}

emitter(Content.prototype);

Content.prototype.blur = function() {
  this.element.classList.toggle('blur');

  return this;
};

Content.prototype.insert = function(element) {
  replace('#content', this.element, element);

  return this.emit('inserted');
};

module.exports = Content;