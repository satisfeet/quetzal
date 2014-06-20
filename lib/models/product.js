var util  = require('util');
var clone = require('clone');
var merge = require('merge');

function Product(attrs) {
  this.images = [];
  this.details = {};
  this.pricing = {};
  this.variations = {};

  merge(this, attrs);
}

Product.prototype.fromForm = function(body) {
  body.images = body.images
    .split(',')
    .map(function(item)    {
      var parts = item.split(':');

      return {
        name: parts.shift().trim().toLowerCase(),
        url: parts.join(':').trim().toLowerCase()
      };
    });

  body.details = JSON.parse(body.details);

  body.variations = JSON.parse(body.variations);

  return merge(this, body);
};

Product.prototype.toForm = function() {
  var object = clone(this);

  object.images = object.images
    .map(function(item) {
      return item.name + ':' + item.url;
    })
    .join(', ');

  if (Object.keys(object.details).length) {
    object.details = JSON.stringify(object.details, null, 2);
  } else {
    object.details = null;
  }
  if (Object.keys(object.variations).length) {
    object.variations = JSON.stringify(object.variations, null, 2);
  } else {
    object.variations = null;
  }

  return object;
};

module.exports = Product;
