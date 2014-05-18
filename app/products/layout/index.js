var domify  = require('domify');
var emitter = require('emitter');
var replace = require('replace');

var layout = require('./layout');

function Layout() {
  this.element = domify(layout());

  bindToCreateClickEvent(this.element, this);
}

emitter(Layout.prototype);

Layout.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

module.exports = Layout;

function bindToCreateClickEvent(element, view) {
  element.querySelector('#create').addEventListener('click', function(e) {
    view.emit('create');
  });
}