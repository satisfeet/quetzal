import page  from 'page';
import shell from 'shell';
import agent from 'agent';

import Form  from './form';
import Show  from './show';
import Table from './table';

page('/customers', function(context, next) {
  var table = new Table();

  agent.get('/customers')
    .end(function(err, res) {
      if (err) throw err;

      shell.layout
        .empty()
        .append(table.list(res.body).element);
      });
});

page('/customers/create', function(context, next) {
  var form = new Form();

  form.once('submit', function(customer) {
    agent.post('/customers')
      .send(customer)
      .end(function(err, res) {
        if (err) throw err;

        page('/customers');
      });
  });

  shell.layout
    .empty()
    .append(form.element);
});

page('/customers/:customer', resolve, function(context, next) {
  var show = new Show(context.state.customer);

  shell.layout
    .empty()
    .append(show.element);
});

page('/customers/:customer/change', resolve, function(context, next) {
  var form = new Form(context.state.customer);

  form.once('submit', function(customer) {
    customer.id = context.state.customer.id;

    agent.put('/customers/' + customer.id)
      .send(customer)
      .end(function(err, res) {
        if (err) throw err;

        page('/customers/' + customer.id);
      });
  });

  shell.layout
    .empty()
    .append(form.element);
});

page('/customers/:customer/delete', resolve, function(context, next) {

});

function resolve(context, next) {
  agent.get('/customers/' + context.params.customer)
    .end(function(err, res) {
      if (err) throw err;

      context.state.customer = res.body;

      next();
    });
}
