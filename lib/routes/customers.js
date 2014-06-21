module.exports = function(app) {

  app.get('/customers', function* (next) {
    var result = yield this.client.find('customers', {
      search: this.query.search,
      filter: this.query.filter
    });

    switch (this.accepts('html', 'json')) {
      case 'json':
        this.body = result;
        break;
      case 'html':
        yield this.render('customers/list', {
          customers: result
        });
        break;
      default:
        this.throw(406);
    }
  });

  app.get('/customers/create', function* (next) {
    yield this.render('customers/form');
  });

  app.get('/customers/:customer', function* (next) {
    var result = yield this.client.findOne('customers', {
      id: this.params.customer
    });

    switch (this.accepts('html', 'json')) {
      case 'json':
        this.body = result;
        break;
      case 'html':
        yield this.render('customers/show', {
          customer: result
        });
        break;
      default:
        this.throw(406);
    }
  });

};
