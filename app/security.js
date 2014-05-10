import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

import layout from './layout';

page('*', function(context, next) {
  auth.check(function(err, active) {
    if (err) throw err;

    if (!active) {
      layout.empty().insert(shell.login.element);
    } else {
      next();
    }
  });
});

shell.login.on('submit', function(account) {
  console.log('account', account);
  auth.authenticate(account, function(err, active) {
    if (err) return shell.login.error();

    if (active) {
      shell.login.state('success');
    } else {
      shell.login.state('warning');
    }
  });
});
