var Form     = require('form');
var List     = require('list');
var Show     = require('show');
var Layout   = require('layout');
var Router   = require('router');
var Customer = require('customer');

var router = new Router();
var layout = new Layout();

router.on('/customers', find, function(context) {
  var list = new List(context.customers);

  list.once('click', function(model) {
    router.go('/customers/' + model.get('id'));
  });

  layout.insert(list.element);
});

router.on('/customers/create', function(context) {
  var form = new Form(new Customer());

  form.on('submit', function(model) {
    router.go('/customers/' + model.get('id'));
  });

  layout.insert(form.element);
});

router.on('/customers/:customer', findOne, function(context) {
  var show = new Show(context.customer);

  show.on('delete', function(model) {
    router.go('/customers');
  });

  layout.insert(show.element);
});

router.listen('/customers');

function find(context, next) {
  Customer.find(function(err, collection) {
    context.customers = collection;

    next();
  });
}

function findOne(context, next) {
  if (context.params.customer === 'create') return;

  Customer.findOne(context.params.customer, function(err, model) {
    context.customer = model;

    next();
  });
}
