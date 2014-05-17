var page   = require('page');
var agent  = require('agent');
var layout = require('layout');

var Form    = require('./form');
var Table   = require('./table');
var Detail  = require('./detail');
var Content = require('./content');
var Confirm = require('./confirm');

var manager = agent('/customers');

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

page('/customers', find, function(context) {
  var table   = new Table();
  var content = new Content();

  context.customers.forEach(table.add, table);

  content.on('search', function(query) {
    table.empty();

    context.customers
      .forEach(function(model) {
        return Object.keys(model)
          .map(function(key) {
            return model[key];
          })
          .some(function(value) {
            return query.test(value);
          });
        })
      .forEach(table.add, table);
  });
  content.on('create', function() {
    var form = new Form().once('submit', create);

    layout.modal.insert(form.element).open();
  });
  content.showSearch().empty().append(table.element);

  layout.content.insert(content.element);
});

page('/customers/:customer', findOne, function(context) {
  var detail = new Detail(context.customer);
  var content = new Content();

  detail.on('change', update);
  detail.on('update', function() {
    var form = new Form(context.customer).once('submit', update);

    layout.modal.insert(form.element).open();
  });
  detail.on('destroy', function() {
    var confirm = new Confirm(context.customer).once('submit', destroy);

    layout.modal.insert(confirm.element).open();
  });
  content.hideSearch().empty().append(detail.element);

  layout.content.insert(content.element);
});

function create(model, view) {
  manager.post(model, function(ok) {
    if (!ok) return view.alert('Could not create customer.');
  });
}

function destroy(model, view) {
  manager.del(model.id, function(ok) {
    if (!ok) return view.alert('Could not destroy customer.');
  });
}

function update(model, view) {
  manager.put(model.id, model, function(ok) {
    if (!ok) return view.alert('Could not save your changes.');
  });
}