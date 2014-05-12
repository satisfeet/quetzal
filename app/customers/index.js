import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import Form  from './form';
import Show  from './show';
import Table from './table';

page('/customers', function(context, next) {
  var table = new Table();

  agent.get('/customers').end(function(err, res) {
    if (err) throw err;

    layout.replace(table.list(res.body).element);
  });
});

page('/customers/create', function(context, next) {
  var form = new Form();

  form.once('submit', function(customer) {
    agent.post('/customers').send(customer).end(function(err, res) {
      if (err) throw err;

      page('/customers');
    });
  });

  layout.replace(form.element);
});

page('/customers/:customer', resolve, function(context, next) {
  var show = new Show(context.state.customer);

  layout.replace(show.element);
});

page('/customers/:customer/change', resolve, function(context, next) {
  var form = new Form(context.state.customer);

  form.once('submit', function(customer) {
    var id = customer.id = context.state.customer.id;

    agent.put('/customers/' + id).send(customer).end(function(err, res) {
      if (err) throw err;

      page('/customers/' + customer.id);
    });
  });

  layout.replace(form.element);
});

page('/customers/:customer/delete', resolve, function(context, next) {

});

function resolve(context, next) {
  agent.get('/customers/' + context.params.customer).end(function(err, res) {
    if (err) throw err;

    context.state.customer = res.body;

    next();
  });
}
