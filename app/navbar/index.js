import auth from 'auth';

import Navbar from './navbar';

var navbar = new Navbar();

transform(auth.token());

auth.on('check', transform);
auth.on('signin', transform);
auth.on('signout', transform);

function transform(success) {
  console.log('transform');
  navbar.toggleActionsState(success);
}