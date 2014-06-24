var router = require('koa-router');

var app = new router();

app.post('/', function* (next) {
  var result = yield this.client.persist('products', this.request.body);

  switch (this.accepts('json')) {
    case 'json':
      this.body = result;
      break;
    default:
      this.throw(406);
  }
});

app.get('/', function* (next) {
  var result = yield this.client.find('products', {
    search: this.query.search,
    filter: this.query.filter
  });

  switch (this.accepts('html', 'json')) {
    case 'html':
      yield this.render('products/list', {
        products: result
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
      yield this.render('products/form');
      break;
    default:
      this.throw(406);
  }
});

app.get('/:product', function* (next) {
  var result = yield this.client.findOne('products', {
    id: this.params.product
  });

  switch (this.accepts('html', 'json')) {
    case 'html':
      yield this.render('products/show', {
        product: result
      });
      break;
    case 'json':
      this.body = result;
      break;
    default:
      this.throw(406);
  }
});

app.put('/:product', function* (next) {
  if (!this.request.body) this.throw(400);

  yield this.client.persist('products', this.request.body);

  this.status = 204;
});

app.del('/:product', function* (next) {
  yield this.client.remove('products', {
    id: this.params.product
  });

  this.status = 204;
});

module.exports = app.middleware();
