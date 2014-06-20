exports.index = function* (next) {
  var results = yield this.client.find('products', {
    filter: this.query.filter
  });

  yield this.render('products/index', {
    products: results
  });
};

exports.show = function* (next) {
  var result = yield this.client.findOne('products', {
    id: this.params.product
  });

  yield this.render('products/show', {
    product: result
  });
};

exports.create = function* (next) {
  var model = new this.Product().fromForm(this.request.body);

  try {
    var result = yield this.client.persist('products', model);
  } catch(err) {
    this.session.flash.error = err.toString();
    this.session.flash.product = model.toForm();

    return this.redirect('/products/create');
  }

  this.redirect('/products/' + result.id);
};

exports.update = function* (next) {
  var result = this.client.findOne('products', {
    id: this.params.product
  });
};

exports.remove = function* (next) {

};

exports.createForm = function* (next) {
  var model = new this.Product();

  yield this.render('products/form', {
    modal: { title: 'Create Product' },
    product: model.toForm()
  });
};

exports.updateForm = function* (next) {
  var result = yield this.client.findOne('products', {
    id: this.params.product
  });

  yield this.render('products/form', {
    modal: { title: 'Update Product' },
    product: new this.Product(result).toForm()
  });
};

exports.removeForm = function* (next) {
  yield this.render('products/remove', {
    modal: { title: 'Remove Product' }
  });
};
