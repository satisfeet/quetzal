var router = require('koa-router');

var app = new router();

app.post('/', function* (next) {
  var result = yield this.client.persist('customers', this.request.body);

  switch (this.accepts('json')) {
    case 'json':
      this.body = result;
      break;
    default:
      this.throw(406);
  }
});

app.get('/', function* (next) {
  var result = yield this.client.find('customers', {
    search: this.query.search,
    filter: this.query.filter
  });

  switch (this.accepts('html', 'json')) {
    case 'html':
      yield this.render('customers/list', {
        customers: result
      });
      break;
    case 'json':
      this.body = result;
      break;
    default:
      this.throw(406);
  }
});

app.get('/create', function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('customers/form');
      break;
    default:
      this.throw(406);
  }
});

app.get('/:customer', function* (next) {
  var result = yield this.client.findOne('customers', {
    id: this.params.customer
  });

  switch (this.accepts('html', 'json')) {
    case 'html':
      yield this.render('customers/show', {
        customer: result
      });
      break;
    case 'json':
      this.body = result;
      break;
    default:
      this.throw(406);
  }
});

app.put('/:customer', function* (next) {
  yield this.client.persist('customers', this.request.body);

  this.status = 204;
});

app.del('/:customer', function* (next) {
  yield this.client.remove('customers', {
    id: this.params.customer
  });

  this.status = 204;
});

module.exports = app.middleware();
