var domify  = require('domify');
var emitter = require('emitter');
var replace = require('replace');

var content = require('./content');

function Content() {
  this.element = domify(content());

  bindToCreateClickEvent(this.element, this);
  bindToSearchInputEvent(this.element, this);
  bindToSearchSubmitEvent(this.element, this);
}

emitter(Content.prototype);

Content.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

Content.prototype.showSearch = function() {
  this.element.querySelector('#search').classList.remove('hidden');

  return this;
};

Content.prototype.hideSearch = function() {
  this.element.querySelector('#search').classList.add('hidden');

  return this;
};

module.exports = Content;

function bindToCreateClickEvent(element, view) {
  element.querySelector('#create').addEventListener('click', function(e) {
    view.emit('create');
  });
}

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