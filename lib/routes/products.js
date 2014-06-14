var https = require('https');

module.exports = function(app) {

  app.get('/products', function* (next) {
    this.body = 'Hello';
  });

};
