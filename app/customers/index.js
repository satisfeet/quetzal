import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import Form    from './form';
import Table   from './table';
import Section from './section';
import Confirm from './confirm';

var manager = agent('/customers');

page('/customers', function list(context, next) {
  var table = new Table();

  manager.get(function(ok, body) {
    table.list(body);
  });

  layout.content.empty().append(table.element);
});

page('/customers/create', function create(context, next) {
  var form = new Form();

  form.once('submit', function(customer) {
    manager.post(customer, function(ok, body) {
      page('/customers');
    });
  });

  layout.content.empty().append(form.element);
});

page('/customers/:customer', resolve, function details(context, next) {
  var section = new Section(context.state.customer);

  section.on('submit', function(customer) {
    manager.put(customer.id, customer, function(ok, body) {
      if (!ok) section.alert('Could not save your changes.');
    });
  });
  section.once('reset', function() {
    details(context);
  });

  layout.content.empty().append(section.element);
});

page('/customers/:customer/change', resolve, function change(context, next) {
  var form = new Form(context.state.customer);

  form.once('submit', function(customer) {
    customer.id = context.state.customer.id;

    manager.put(customer.id, customer, function(ok, body) {
      page('/customers/' + customer.id);
    });
  });

  layout.content.empty().append(form.element);
});

page('/customers/:customer/remove', resolve, function remove(context, next) {
  var confirm = new Confirm(context.state.customer);

  confirm.once('submit', function(customer) {
    manager.del(customer.id, function(ok, body) {
      layout.overlay.close();

      page('/customers');
    });
  });
  confirm.once('cancel', function(customer) {
    layout.overlay.close();

    page('/customers/' + customer.id)
  });

  layout.overlay.open(confirm.element);
});

function resolve(context, next) {
  manager.get(context.params.customer, function(ok, body) {
    context.state.customer = body;

    next();
  });
}
