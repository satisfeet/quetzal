import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

page(function(context, next) {
  if (context.path === '/login') return next();

  auth.check(function(err, active) {
    if (err) throw err;

    if (!active) {
      page('/login');
    } else {
      shell.navbar.showActions();

      next();
    }
  });
});

import 'reporter';
import 'customers';

page();