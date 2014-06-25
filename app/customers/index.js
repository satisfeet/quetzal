var Form     = require('form');
var List     = require('list');
var Show     = require('show');
var Layout   = require('layout');
var Router   = require('router');
var Customer = require('customer');

var router = new Router();
var layout = new Layout();

layout.on('search', function(value) {
  router.go('/customers?search=' + value);
});

router.on('/customers', find, function(context) {
  var list = new List(context.customers);

  list.once('click', function(model) {
    router.go('/customers/' + model.get('id'));
  });

  layout.on('filter', function(value) {
    list.empty();

    context.customers
      .select(function(model) {
        return model.contains(value);
      })
      .each(function(model) {
        list.append(model);
      });
  });

  layout.insert(list.element);
});

router.on('/customers/create', function(context) {
  var form = new Form(new Customer());

  form.on('submit', function(model) {
    Customer.create(model, function(err) {
      if (err) return form.alert(err);

      router.go('/customers/' + model.id);
    });
  });

  layout.insert(form.element);
});

router.on('/customers/:customer', findOne, function(context) {
  var show = new Show(context.customer);

  show.on('update', function(model) {
    Customer.update(model, function(err) {
      if (err) throw err;
    });
  });
  show.on('delete', function(model) {
    Customer.remove(model, function(err) {
      if (err) throw err;

      router.go('/customers');
    });
  });

  layout.insert(show.element);
});

router.listen('/customers');

function find(context, next) {
  Customer.find(context.query, function(err, collection) {
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
