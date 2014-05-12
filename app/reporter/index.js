import page   from 'page';
import agent  from 'agent';
import domify from 'domify';
import layout from 'layout';

import template from './template';

page('/', function() {
  agent.get('/').end(function(err, res) {
    if (err) throw err;

    layout
      .empty()
      .append(domify(template(res.body)));
  });
});