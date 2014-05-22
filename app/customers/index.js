var page    = require('page');
var modal   = require('modal');
var rester  = require('rester');
var replace = require('replace');

var Form    = require('./form');
var Table   = require('./table');
var Detail  = require('./detail');
var Layout  = require('./layout');
var Confirm = require('./confirm');

var agent = rester('http://engine.satisfeet.me/customers');

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
      manager.persist(model, function(response) {
        if (!response.ok) return form.alert('Could not create customer.');

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
    manager.persist(model).end();
  });
  detail.on('update', function() {
    var form = new Form(context.customer);

    form.once('submit', function(model) {
      agent.persist(model, function(response) {
        if (!response.ok) return form.alert('Could not save your changes.');

        page('/customers/' + model.id);

        modal.close();
      });
    });

    modal.title('Update Customer').insert(form.element).open();
  });
  detail.on('destroy', function() {
    var confirm = new Confirm(context.customer);

    confirm.once('submit', function(model) {
      agent.destroy(model.id, function(response) {
        if (!response.ok) return view.alert('Could not destroy customer.');

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
  agent.find(function(response) {
    context.customers = response.body;

    next();
  });
}

function findOne(context, next) {
  var param = context.params.customer;

  agent.findOne(param, function(response) {
    context.customer = response.body;

    next();
  });
}