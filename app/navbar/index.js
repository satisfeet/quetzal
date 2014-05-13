import auth from 'auth';

import Navbar from './navbar';

var navbar = new Navbar();

auth.on('check', transform);
auth.on('signin', transform);
auth.on('signout', transform);

function transform(success) {
  navbar.active = success;
}
