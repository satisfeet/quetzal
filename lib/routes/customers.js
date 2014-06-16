var conure = require('conure');

module.exports = function(app) {

  var client = conure.createClient({
    username: 'bodokaiser',
    password: 'erdbeere71'
  });

  app.get('/customers', function* (next) {
    var result = yield client.find('customers');

    yield this.render('customers/table', {
      customers: result
    });
  });

  app.post('/customers', function* (next) {
    var result = yield request(this);

    if (!result.ok) {
      this.session.flash.error = 'Could not create customer.';
      this.session.flash.customer = this.request.body;

      return this.redirect('/customers/create');
    }

    this.redirect('/customers');
  });

  app.get('/customers/create', function* (next) {
    yield this.render('customers/form', {
      modal: { title: 'Create Customer' }
    });
  });

  app.get('/customers/:customer', function* (next) {
    var result = yield request(this);

    yield this.render('customers/show', {
      customer: result.body
    });
  });

  app.get('/customers/:customer/update', function* (next) {
    var result = yield request(this);

    yield this.render('customers/form', {
      modal: { title: 'Update Customer' },
      customer: result.body
    });
  });

  app.get('/customers/:customer/remove', function* (next) {
    this.body = 'not yet';
  });

};
