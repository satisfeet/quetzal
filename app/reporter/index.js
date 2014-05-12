import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import template from './template';

page('/', function() {
  agent().get('/', function(ok, body) {
    layout.replace(template(body));
  });
});