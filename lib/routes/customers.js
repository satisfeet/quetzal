var superagent = require('superagent');

module.exports = function(app) {

  app.get('/customers', function* (next) {
    var result = yield request(this);

    yield this.render('customers/table', {
      customers: result.body
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

function request(context) {
  var url = 'https://engine.satisfeet.me' + context.path;

  var username = context.session.username;
  var password = context.session.password;

  var req = superagent[context.method.toLowerCase()](url);

  if (context.request.body) {
    req.send(context.request.body);
  }

  return function(callback) {
    req.auth(username, password).end(function(err, res) {
      callback(err, res);
    });
  }
}
