import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

page(function(context, next) {
  if (context.path === '/signin') return next();

  auth.once('check', function(success) {
    if (success) return next();

    page('/signin');
  });
  auth.check();
});

import 'reporter';
import 'customers';

page();
