var domify  = require('domify');
var emitter = require('emitter');
var replace = require('replace');

var content = require('./layout');

function Layout(model) {
  this.element = domify(content({
    customer: model
  }));

  // we dont have a search query normaly
  if (model) return;
  bindToSearchInputEvent(this.element, this);
  bindToSearchSubmitEvent(this.element, this);
}

emitter(Layout.prototype);

Layout.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

module.exports = Layout;

function bindToSearchInputEvent(element, view) {
  element.querySelector('#search').addEventListener('input', function(e) {
    view.emit('search', new RegExp(e.target.value));
  });
}

function bindToSearchSubmitEvent(element, view) {
  element.querySelector('#search').addEventListener('submit', function(e) {
    console.log('not yet implemented...');
  });
}