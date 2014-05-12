import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

page(function(context, next) {
  if (context.path === '/signin') return next();

  auth.check(function(err, success) {
    if (err) throw err;

    if (!success) {
      page('/signin');
    } else {
      shell.navbar.showActions();

      next();
    }
  });
});

import 'reporter';
import 'customers';

page();
