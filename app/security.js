import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

import layout from './layout';

page('*', function(context, next) {
  if (auth.state) return next();

  layout.empty().insert(shell.login.element);
});

auth.on('error', function() {
  shell.login.error();
});

auth.on('failure', function() {
  shell.login.failure();
});

auth.on('success', function() {
  shell.login.success();
});

shell.login.on('submit', function(username, password) {
  auth.authenticate(username, password);
});
