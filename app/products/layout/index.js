var domify  = require('domify');
var emitter = require('emitter');
var replace = require('replace');

var layout = require('./layout');

function Layout(model) {
  this.element = domify(layout({
    product: model
  }));
}

emitter(Layout.prototype);

Layout.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

module.exports = Layout;
