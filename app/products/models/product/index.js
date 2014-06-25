var model = require('model');
var rest  = require('model-rest');

Product = model('Product', {
  title: String,
  pricing: {
    retail: Number
  },
  variations: Object,
  description: String
});

Product.use(rest);

module.exports = Product;
