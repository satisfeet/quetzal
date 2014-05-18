var page    = require('page');
var agent   = require('agent');
var modal   = require('modal');
var replace = require('replace');

var Form    = require('./form');
var Table   = require('./table');
var Detail  = require('./detail');
var Layout  = require('./layout');
var Confirm = require('./confirm');

var manager = agent('/customers');

page('/customers', find, function(context) {
  var table  = new Table();
  var layout = new Layout();

  context.customers.forEach(table.add, table);

  layout.on('search', function(query) {
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
  layout.on('create', function() {
    var form = new Form();

    form.once('submit', function(model) {
      manager.post(model, function(ok) {
        if (!ok) return form.alert('Could not create customer.');

        page('/customers');

        modal.close();
      });
    });

    modal.title('Create Customer').insert(form.element).open();
  });
  layout.showSearch();

  replace('#content', layout.insert(table.element).element);
});

page('/customers/:customer', findOne, function(context) {
  var layout = new Layout();
  var detail = new Detail(context.customer);

  detail.on('change', function() {
    manager.put(model.id, model, function(ok) {});
  });
  detail.on('update', function() {
    var form = new Form(context.customer);

    form.once('submit', function(model) {
      manager.put(model.id, model, function(ok) {
        if (!ok) return form.alert('Could not save your changes.');

        page('/customers/' + model.id);

        modal.close();
      });
    });

    modal.title('Update Customer').insert(form.element).open();
  });
  detail.on('destroy', function() {
    var confirm = new Confirm(context.customer);

    confirm.once('submit', function(model) {
      manager.del(model.id, function(ok) {
        if (!ok) return view.alert('Could not destroy customer.');

        page('/customers');

        modal.close();
      });
    });

    modal.title('Destroy Customer').insert(confirm.element).open();
  });
  layout.hideSearch();

  replace('#content', layout.insert(detail.element).element);
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