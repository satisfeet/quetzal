var page   = require('page');
var agent  = require('agent');
var layout = require('layout');

var Form    = require('./form');
var Table   = require('./table');
var Detail  = require('./detail');
var Confirm = require('./confirm');

var manager = agent('/customers');

page('/customers', find, function(context) {
  var table = new Table(context.customers);

  layout.content.insert(table.element);
});

page('/customers/create', function(context) {
  var form = new Form().once('submit', create);

  layout.content.insert(form.element);
});

page('/customers/:customer', findOne, function(context) {
  var detail = new Detail(context.customer).on('submit', update);

  layout.content.insert(detail.element);
});

page('/customers/:customer/change', findOne, function(context) {
  var form = new Form(context.customer).once('submit', update);

  layout.content.insert(form.element);
});

page('/customers/:customer/remove', findOne, function(context, next) {
  var confirm = new Confirm(context.customer).once('submit', destroy);

  layout.overlay.open(confirm.element);
});

function find(context, next) {
  manager.get(function(ok, body) {
    context.customers = body;

    next();
  });
}

function findOne(context, next) {
  manager.get(context.params.customer, function(ok, body) {
    context.customer = body;

    next();
  });
}

function create(model, view) {
  manager.post(model, function(ok) {
    if (!ok) return view.alert('Could not create customer.');

    page('/customers');
  });
}

function destroy(model, view) {
  manager.del(model.id, function(ok) {
    if (!ok) return view.alert('Could not destroy customer.');

    page('/customers');
  });
}

function update(model, view) {
  manager.put(model.id, model, function(ok) {
    if (!ok) return view.alert('Could not save your changes.');

    page('/customers/' + model.id);
  });
}