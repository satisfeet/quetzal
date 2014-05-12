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
    auth.once('error', function(error) {
      signin.error(error);
    });
    auth.once('signin', function(success) {
      if (!success) return signin.state('warning');

      signin.state('success');

      setTimeout(function() {
        layout.setup();

        page('/');
      }, 500);
    });
    auth.signin(account);
  });

  layout.overlay(signin.element);
});

page('/signout', function(context, next) {
  auth.signout();

  page('/signin');
});

auth.once('check', toggleNavbarActions);
auth.once('signin', toggleNavbarActions);

function toggleNavbarActions(success) {
  if (!success) return navbar.hideActions();

  navbar.showActions();
}