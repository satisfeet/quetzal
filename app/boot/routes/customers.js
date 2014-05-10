import auth    from 'auth';
import page    from 'page';
import shell   from 'shell';
import agent   from 'agent';

import layout from '../layout';

page('/customers', resolve, function(context, next) {
  shell.table.list(context.state.customers);

  layout.empty().insert(shell.table.element);
});

function resolve(context, next) {
  if (context.state.customers) return next();

  agent.get('/customers').end(function(err, res) {
    if (err) throw err;

    context.state.customers = res.body;

    next();
  });
}
