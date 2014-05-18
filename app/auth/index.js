var page  = require('page');
var modal = require('modal');

var Auth   = require('./auth');
var SignIn = require('./sign-in');

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
      signin.state('error');
      signin.alert('danger', 'We had a network error. Sorry try later.');
    });
    auth.once('signin', function(success) {
      if (!success) {
        signin.state('warning');
        signin.alert('warning', 'Your credentials were not accepted.');
      } else {
        signin.state('success');
        signin.alert('success', 'Everything fine. We will proceed.')

        setTimeout(function() {
          modal.close();

          page('/');
        }, 1000);
      }
    });

    auth.signin(account);
  });

  modal.title('Authentication').insert(signin.element).open();
});

page('/sign-out', function(context, next) {
  auth.signout();

  page('/sign-in');
});

module.exports = auth;