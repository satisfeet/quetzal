import auth    from 'auth';
import page    from 'page';
import shell   from 'shell';
import request from 'superagent';

import layout from '../layout';

page('/customers', resolve, function(context, next) {
  shell.table.list(context.state.customers);

  layout.empty().insert(shell.table.element);
});

function resolve(context, next) {
  if (context.state.customers) return next();

  request.get('http://engine.satisfeet.me/customers')
    .set('Authorization', 'Bearer ' + auth.sign())
    .end(function(err, res) {
      if (err) throw err;

      context.state.customers = res.body;

      next();
    });
}
