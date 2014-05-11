import page   from 'page';
import shell  from 'shell';
import agent  from 'agent';
import domify from 'domify';

import template from './template';

page('/', function() {
  agent.get('/').end(function(err, res) {
    if (err) throw err;

    shell.layout
      .empty()
      .append(domify(template(res.body)));
  });
});
