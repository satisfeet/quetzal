import page   from 'page';
import layout from 'layout';

import Auth   from './auth';
import SignIn from './sign-in';

var auth = new Auth();

page(function(context, next) {
  if (context.path === '/sign-in') return next();

  auth.once('check', function(success) {
    if (success) return next();

    page('/sign-in');
  });
  auth.check();
});

page('/sign-in', function(context, next) {
  var signin = new SignIn();

  signin.on('submit', function(account) {
    auth.once('error', function(error) {
      signin.error(error);
    });
    auth.once('signin', function(success) {
      if (!success) return signin.state('warning');

      signin.state('success');

      setTimeout(function() {
        layout.closeOverlay();

        page('/');
      }, 500);
    });

    auth.signin(account);
  });

  layout.openOverlay(signin.element);
});

page('/sign-out', function(context, next) {
  auth.signout();

  page('/sign-in');
});

export default auth;