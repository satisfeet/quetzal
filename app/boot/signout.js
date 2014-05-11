import page  from 'page';
import auth  from 'auth';
import shell from 'shell';

export default = function(context, next) {
  shell.navbar.hideActions();

  auth.signOut(function(err) {
    if (err) throw err;

    page('/login');
  });
};
