var Product = require('product');
var Router  = require('router');
var Layout  = require('layout');
var List    = require('list');
var Show    = require('show');
var Form    = require('form');

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

  show.on('update', function(model) {
    Product.update(model, function(err) {
      if (err) return show.alert(err);
    });
  });
  show.on('delete', function(model) {
    Product.remove(model, function(err) {
      if (err) return show.alert(err);

      router.go('/products');
    });
  });

  layout.insert(show.element);
});

router.listen('/products');

function find(context, next) {
  Product.find(context.query, function(err, result) {
    if (err) throw err;

    context.products = result;

    next();
  });
}

function findOne(context, next) {
  Product.findOne(context.params.product, function(err, result) {
    if (err) throw err;

    context.product = result;

    next();
  });
}
