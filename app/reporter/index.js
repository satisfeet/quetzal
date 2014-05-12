import page   from 'page';
import agent  from 'agent';
import domify from 'domify';
import layout from 'layout';

import template from './template';

page('/', function() {
  agent().get('/', function(ok, body) {
    layout
      .empty()
      .append(domify(template(body)));
  });
});
