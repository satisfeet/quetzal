var page  = require('page');
var modal = require('modal');
var query = require('query');

page(function(context, next) {
  modal.close();

  next();
});

modal.on('opened', function() {
  query('main').classList.add('blur');
});

modal.on('closed', function() {
  query('main').classList.remove('blur');
});
