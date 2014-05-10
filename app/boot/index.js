import page   from 'page';
import domify from 'domify';

import layout from './layout';

page('/', function(context, next) {
  var element = domify('<h1>Hello World</h1>');

  layout.empty().insert(element);
});

import './routes/session';
import './routes/customers';

page();
