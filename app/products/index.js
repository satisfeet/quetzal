import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import List   from './list';
import Detail from './detail';

var manager = agent('/products');

page('/products', find, function(context) {
  var list = new List(context.products);

  layout.content.empty().append(list.element);
});

page('/products/create', function(context) {

});

page('/products/:product', findOne, function(context) {
  var detail = new Detail(context.product);

  layout.content.empty().append(detail.element);
});

page('/products/:product/change', findOne, function(context) {

});

page('/products/:product/remove', findOne, function(context) {

});

function find(context, next) {
  manager.get(function(ok, body, state) {
    context.products = body;

    next();
  });
}

function findOne(context, next) {
  manager.get(context.params.product, function(ok, body, state) {
    context.product = body;

    next();
  });
}
