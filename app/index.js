import page from 'page';
import shell from 'shell';

import security from './security';
import layout   from './layout';

page('/', function(context, next) {
  var customers = [
    { name: 'Bodo Kaiser', email: 'i@bodokaiser.io' },
    { name: 'Edison Trent', email: 'edison@yahoo.com' }
  ];

  layout.empty().insert(shell.table.list(customers).element);
});

page();
