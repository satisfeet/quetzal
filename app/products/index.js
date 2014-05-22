var page    = require('page');
var modal   = require('modal');
var rester  = require('rester');
var replace = require('replace');

var List   = require('./list');
var Form   = require('./form');
var Detail = require('./detail');
var Layout = require('./layout');

var agent = rester('http://engine.satisfeet.me/products');

function find(context, next) {
  agent.find(function(response) {
    context.products = response.body;

    next();
  });
}

function findOne(context, next) {
  var param = context.params.product;

  agent.findOne(param, function(response) {
    context.product = response.body;

    next();
  });
}

page('/products', find, function(context) {
  var list = new List(context.products);
  var layout = new Layout();

  layout.on('create', function() {
    var form = new Form();

    form.once('submit', function() {
      modal.close();
    });

    modal.title('Create Product').insert(form.element).open();
  });

  replace('#content', layout.insert(list.element).element);
});

page('/products/:product', findOne, function(context) {
  var detail = new Detail(context.product);
  var layout = new Layout();

  detail.on('update', function() {
    var form = new Form(context.product);

    form.once('submit', function(model) {
      modal.close();
    });

    modal.title('Update Product').insert(form.element).open();
  });

  replace('#content', layout.insert(detail.element).element);
});
