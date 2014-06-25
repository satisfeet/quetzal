var statics = require('./statics');
var methods = require('./methods');

function Product(source) {
  this.attrs = {};
  this.attrs.pricing = {};
  this.attrs.variations = {};

  if (source) this.set(source);
}

for (var key in statics) {
  Product[key] = statics[key];
}

for (var key in methods) {
  Product.prototype[key] = methods[key];
}

module.exports = Product;
