import page   from 'page';
import agent  from 'agent';
import layout from 'layout';

import List   from './list';
import Form   from './form';
import Detail from './detail';

var manager = agent('/products');

page('/products', find, function(context) {
  var list = new List(context.products);

  layout.content.insert(list.element);
});

page('/products/create', function(context) {
  var form = new Form().once('submit', create);

  layout.content.insert(form.element);
});

page('/products/:product', findOne, function(context) {
  var detail = new Detail(context.product).once('submit', update);

  layout.content.insert(detail.element);
});

page('/products/:product/change', findOne, function(context) {
  var form = new Form().once('submit', update);

  layout.content.insert(form.element);
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

function create(model, view) {
  manager.post(model, function(ok) {
    if (!ok) return view.alert('Could not create product.');

    page('/products/' + model.id);
  });
}

function destroy(model, view) {
  manager.del(model.id, function(ok) {
    if (!ok) return view.alert('Could not destroy product.');

    page('/products');
  });
}

function update(model, view) {
  manager.put(model.id, model, function(ok) {
    if (!ok) return view.alert('Could not update product.');

    page('/products/' + model.id);
  });
}
