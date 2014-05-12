import page   from 'page';
import auth   from 'auth';
import layout from 'layout';

import Signin from './signin';

page('/signin', function(context, next) {
  var signin = new Signin();

  signin.on('submit', function(account) {
    auth.once('error', onerror.bind(signin));
    auth.once('signin', onsignin.bind(signin));

    auth.signin(account);
  });

  layout.overlay(signin.element);
});

function onerror(error) {
  this.error(error);
}

function onsignin(success) {
  if (!success) return this.state('warning');

  this.state('success');

  setTimeout(function() {
    layout.setup();

    page('/');
  }, 500);
}