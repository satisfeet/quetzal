var page    = require('page');
var modal   = require('modal');
var rester  = require('rester');
var replace = require('replace');

var List   = require('./list');
var Form   = require('./form');
var Show   = require('./show');
var Layout = require('./layout');

var agent = rester('http://engine.satisfeet.me/products');

page('/products', find, function(context) {
  var list = new List(context.products);

  replace('#content', new Layout().insert(list.element).element);
});

page('/products/create', function(context) {
  var form = new Form();

  form.once('submit', function(model) {
    agent.persist(model, function(response) {
      if (!response.ok) return form.alert('Could not create Product.');

      page('/products');
    });
  });

  modal.title('Create Product').insert(form.element).open();
});

page('/products/:product', findOne, function(context) {
  var show = new Show(context.product);
  var layout = new Layout(context.product);

  show.on('submit', function(model) {
    agent.persist(model);
  });

  replace('#content', layout.insert(show.element).element);
});

page('/products/:product/change', findOne, function(context) {
  var form = new Form(context.product);

  form.once('submit', function(model) {
    agent.persist(model);

    page('/products/' + model.id);
  });

  modal.title('Change Product').insert(form.element).open();
});

page('/products/:product/destroy', findOne, function(context) {
  modal.title('Destroy Product').open();
});

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
