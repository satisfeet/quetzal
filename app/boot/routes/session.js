import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

import layout from '../layout';

page('*', function(context, next) {
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

page('/login', function(context, next) {
  layout.empty().insert(shell.login.element);
});

page('/logout', function(context, next) {
  shell.navbar.hideActions();

  auth.signOut(function(err) {
    if (err) throw err;

    page('/login');
  });
});

shell.login.on('submit', function(account) {
  auth.signIn(account, function(err, active) {
    if (err) return shell.login.error();

    if (active) {
      shell.login.state('success');

      setTimeout(function() {
        page('/');
      }, 500);
    } else {
      shell.login.state('warning');
    }
  });
});
