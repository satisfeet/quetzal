var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  app.get('/', function* (next) {
    yield this.render('index', {
      name: app.name
    });
  });

  var session = require('./session');

  app.get('/session', session.index);
  app.put('/session', session.create);
  app.del('/session', session.remove);

  var products = require('./products');

  app.get('/products', products.index);
  app.post('/products', products.create);
  app.get('/products/create', products.createForm);
  app.get('/products/:customer', products.display);
  app.put('/products/:customer', products.update);
  app.get('/products/:customer/update', products.updateForm);
  app.del('/products/:customer', products.remove);
  app.get('/products/:customer/remove', products.removeForm);

  var customers = require('./customers');

  app.get('/customers', customers.index);
  app.post('/customers', customers.create);
  app.get('/customers/create', customers.createForm);
  app.get('/customers/:customer', customers.display);
  app.put('/customers/:customer', customers.update);
  app.get('/customers/:customer/update', customers.updateForm);
  app.del('/customers/:customer', customers.remove);
  app.get('/customers/:customer/remove', customers.removeForm);

};
