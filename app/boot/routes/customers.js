import page  from 'page';
import shell from 'shell';

import layout from '../layout';

page('/customers', function(context, next) {
  var customers = [
    { name: 'Bodo Kaiser', email: 'i@bodokaiser.io' },
    { name: 'Edison Trent', email: 'edison@yahoo.com' }
  ];

  layout.empty().insert(shell.table.list(customers).element);
});
