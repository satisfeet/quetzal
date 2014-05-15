import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import List from './list';

var manager = agent('/products');

page('/products', function(context, next) {
  var list = new List();

  manager.get(function(ok, body, state) {
    list.list(body);
  });

  layout.content.empty().append(list.element);
});