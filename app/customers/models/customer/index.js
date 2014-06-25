var model = require('model');
var rest  = require('model-rest');

var Customer = model('Customer', {
  name: String,
  email: String,
  company: String,
  address: {
    street: String,
    city: String,
    zip: Number
  }
});

Customer.use(rest);

module.exports = Customer;
