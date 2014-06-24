var superagent = require('superagent');

var Router = require('router');
var Layout = require('layout');
var List   = require('list');
var Show   = require('show');
var Form   = require('form');

var router = new Router();
var layout = new Layout();

router.on('/products', find, function(context) {
  var list = new List(context.products);

  layout.insert(list.element);
});

router.on('/products/create', function(context) {
  var form = new Form();

  layout.insert(form.element);
});

router.on('/products/:product', findOne, function(context) {
  var show = new Show(context.product);

  layout.insert(show.element);
});

router.listen('/products');

function find(context, next) {
  superagent.get('/products').accept('json')
    .end(function(err, res) {
      if (err) throw err;

      context.products = res.body;

      next();
    });
}

function findOne(context, next) {
  var param = context.params.product;

  if (param === 'create') return;

  superagent.get('/products/' + param).accept('json')
    .end(function(err, res) {
      if (err) throw err;

      context.product = res.body;

      next();
    });
}
