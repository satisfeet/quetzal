var page   = require('page');
var agent  = require('agent');
var layout = require('layout');

var List    = require('./list');
var Form    = require('./form');
var Detail  = require('./detail');
var Content = require('./content');

var manager = agent('/products');

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

page('/products', find, function(context) {
  var list = new List(context.products);
  var content = new Content();

  content.on('create', function() {
    var form = new Form().once('submit', create);

    layout.modal.title('Create Product').insert(form.element).open();
  });
  content.insert(list.element);

  layout.content.insert(content.element);
});

page('/products/:product', findOne, function(context) {
  var detail = new Detail(context.product).once('submit', update);
  var content = new Content();

  detail.on('update', function() {
    var form = new Form(context.product).once('submit', update);

    layout.modal.title('Update Product').insert(form.element).open();
  });
  detail.on('remove', function() {
    console.log('not yet implemented');
  });
  content.insert(detail.element);

  layout.content.insert(content.element);
});

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
