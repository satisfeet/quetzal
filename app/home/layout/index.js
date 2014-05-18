var domify  = require('domify');
var replace = require('replace');

var layout = require('./layout');

function Layout() {
  this.element = domify(layout());
}

Layout.prototype.insert = function(element) {
  replace('#content-inner', this.element, element);

  return this;
};

module.exports = Layout;