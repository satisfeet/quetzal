import auth from 'auth';

import Navbar from './navbar';

var navbar = new Navbar();

auth.on('check', toggleActions);
auth.on('signin', toggleActions);
auth.on('signout', toggleActions);

function toggleActions(success) {
  if (!success) return navbar.hideActions();

  navbar.showActions();
}