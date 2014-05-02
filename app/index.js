import page       from 'page';
import superagent from 'superagent';

import Table  from 'table';
import Layout from 'layout';

var layout = new Layout(document);

page('/customers', function(context, next) {
  var customers = [
    { name: 'Bodo Kaiser', email: 'i@bodokaiser.io' },
    { name: 'Edison Trent', email: 'edison@yahoo.com' }
  ];

  layout.insert(new Table().list(customers).element);
});

page();
