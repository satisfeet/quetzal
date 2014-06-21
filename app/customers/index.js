var List     = require('list');
var Show     = require('show');
var Layout   = require('layout');
var Router   = require('router');
var Customer = require('customer');

var router = new Router();
var layout = new Layout();

router.on('/customers', find, function(context) {
  var list = new List(context.customers);

  list.once('click', function(id) {
    router.go('/customers/' + id);
  });

  layout.insert(list.element);
});

router.on('/customers/:customer', findOne, function(context) {
  var show = new Show(context.customer);

  layout.insert(show.element);
});

router.start();

function find(context, next) {
  Customer.all(function(err, collection) {
    context.customers = collection;

    next();
  });
}

function findOne(context, next) {
  var param = context.params.customer;

  Customer.get(param, function(err, model) {
    context.customer = model;

    next();
  });
}
