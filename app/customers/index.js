import page  from 'page';
import shell from 'shell';
import agent from 'agent';

import Form  from './form';
import Table from './table';

page('/customers', function(context, next) {
  var table = new Table();

  agent.get('/customers').end(function(err, res) {
    if (err) throw err;

    shell.layout
      .empty()
      .append(table.list(res.body).element);
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

  shell.layout
    .empty()
    .append(form.element);
});

page('/customers/:customer', function(context, next) {
  // blabla
});
