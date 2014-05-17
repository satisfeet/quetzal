var auth = require('auth');

var Navbar = require('./navbar');

var navbar = new Navbar();

transform(auth.token());

auth.on('check', transform);
auth.on('signin', transform);
auth.on('signout', transform);

function transform(success) {
  navbar.setActions(auth.user());
  navbar.toggleActionsState(success);
}
