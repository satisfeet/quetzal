var domify  = require('domify');

var content = require('./content');

function Content() {
  this.element = domify(content());
}

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
