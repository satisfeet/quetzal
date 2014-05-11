import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

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
  shell.layout
    .overlay(shell.signin.element);
});

page('/logout', function(context, next) {
  shell.navbar.hideActions();

  auth.signOut(function(err) {
    if (err) throw err;

    page('/login');
  });
});

shell.signin.on('submit', function(account) {
  auth.signIn(account, function(err, active) {
    if (err) return shell.signin.error();

    if (active) {
      shell.signin.state('success');

      setTimeout(function() {
        shell.layout.setup();

        page('/');
      }, 500);
    } else {
      shell.signin.state('warning');
    }
  });
});