import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

import signin    from './signin';
import signout   from './signout';
import reporter  from './reporter';
import customers from './customers';

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

page('/signin', signin);
page('/signout', signout);
page('/reporter', reporter);
page('/customers', customers);

page();
