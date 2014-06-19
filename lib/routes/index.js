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
  app.get('/products/:product/update', products.updateForm);
  app.get('/products/:product/remove', products.removeForm);
  app.get('/products/:product', products.show);
  app.put('/products/:product', products.update);
  app.del('/products/:product', products.remove);

  var customers = require('./customers');

  app.get('/customers', customers.index);
  app.post('/customers', customers.create);
  app.get('/customers/create', customers.createForm);
  app.get('/customers/:customer/update', customers.updateForm);
  app.get('/customers/:customer/remove', customers.removeForm);
  app.get('/customers/:customer', customers.show);
  app.put('/customers/:customer', customers.update);
  app.del('/customers/:customer', customers.remove);

};
