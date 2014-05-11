import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

export default = function(context, next) {
  shell.layout.overlay(shell.signin.element);
};

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
