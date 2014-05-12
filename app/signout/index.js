import page from 'page';
import auth from 'auth';

page('/signout', function(context, next) {
  auth.signout();

  page('/signin');
});