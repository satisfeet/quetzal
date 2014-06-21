var model = require('model');

var Customer = model('Customer')
  .headers({
    'Accept': 'application/json'
  })
  .attr('id', {
    type: 'string'
  })
  .attr('name', {
    type: 'string'
  })
  .attr('email', {
    type: 'string'
  })
  .attr('address', {
    type: 'object'
  });

module.exports = Customer;
