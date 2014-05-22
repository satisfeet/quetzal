var page    = require('page');
var modal   = require('modal');
var rester  = require('rester');
var replace = require('replace');

var Show    = require('./show');
var Form    = require('./form');
var Table   = require('./table');
var Layout  = require('./layout');
var Destroy = require('./destroy');

var agent = rester('http://engine.satisfeet.me/customers');

page('/customers', find, function(context) {
  var table  = new Table(context.customers);
  var layout = new Layout();

  layout.on('search', function(query) {
    table.filter(context.customers, query);
  });

  replace('#content', layout.insert(table.element).element);
});

page('/customers/create', function(context) {
  var form = new Form();

  form.once('submit', function(model) {
    agent.persist(model, function(response) {
      if (!response.ok) return form.alert('Could not create customer.');

      page('/customers');
    });
  });

  modal.title('Customer Create').insert(form.element).open();
});

page('/customers/:customer', findOne, function(context) {
  var show   = new Show(context.customer);
  var layout = new Layout(context.customer);

  show.on('submit', function(model) {
    agent.persist(model, function(response) {
      if (!response.ok) return show.alert('Could not update customer.');

      page('/customers/' + model.id);
    });
  });

  replace('#content', layout.insert(show.element).element);
});

page('/customers/:customer/update', findOne, function(context) {
  var form = new Form(context.customer);

  form.once('submit', function(model) {
    agent.persist(model, function(response) {
      if (!response.ok) return form.alert('Could not update customer.');

      page('/customers/' + model.id);
    });
  });

  modal.title('Customer Update').insert(form.element).open();
});

page('/customers/:customer/destroy', findOne, function(context) {
  var destroy = new Destroy(context.customer);

  destroy.once('submit', function(model) {
    agent.destroy(model, function() {
      page('/customers');
    });
  });

  modal.title('Customer Destroy').insert(destroy.element).open();
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