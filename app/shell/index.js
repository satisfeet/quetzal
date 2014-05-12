import page from 'page';
import auth from 'auth';

import Layout from './layout';
import Navbar from './navbar';
import Signin  from './signin';

export var navbar = new Navbar();
export var layout = new Layout();

page('/signin', function(context, next) {
  var signin = new Signin();

  signin.on('submit', function(account) {
    auth.signin(account, function(err, success) {
      if (err) return signin.error();
      if (!success) return signin.state('warning');

      signin.state('success');

      setTimeout(function() {
        layout.setup();

        page('/');
      }, 500);
    });
  });

  layout.overlay(signin.element);
});

page('/signout', function(context, next) {
  navbar.hideActions();

  auth.signout(function(err) {
    if (err) throw err;

    page('/login');
  });
});
