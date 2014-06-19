exports.index = function* (next) {
  var result = yield this.client.find('customers', {
    search: this.query.search,
    filter: this.query.filter
  });

  yield this.render('customers/table', {
    search: this.query.search,
    customers: result
  });
};

exports.create = function* (next) {
  var body = this.request.body;

  try {
    var result = yield this.client.persist('customers', body);
  } catch(err) {
    this.session.flash.error = err.toString();
    this.session.flash.customer = body;

    return this.redirect('/customers/create');
  }

  this.redirect('/customers/' + result.id);
};

exports.show = function* (next) {
  var result = yield this.client.findOne('customers', {
    id: this.params.customer
  });

  yield this.render('customers/show', {
    customer: result
  });
};

exports.update = function* (next) {
  try {
    yield this.client.persist('customers', this.request.body);
  } catch(err) {
    this.session.flash.error = err.toString();
    this.session.flash.customer = body;

    return this.redirect('/customers/' + this.params.customer + '/update');
  }

  this.redirect('/customers/' + this.params.customer);
};

exports.remove = function* (next) {
  try {
    yield this.client.remove('customers', {
      id: this.params.customer
    });
  } catch(err) {
    this.session.flash.error = err.toString();

    return this.redirect('/customers/' + body.id + '/remove');
  }

  this.redirect('/customers');
};

exports.createForm = function* (next) {
  yield this.render('customers/form', {
    modal: { title: 'Create Customer' }
  });
};

exports.updateForm = function* (next) {
  var result = yield this.client.findOne('customers', {
    id: this.params.customer
  });

  yield this.render('customers/form', {
    modal: { title: 'Update Customer' },
    customer: result
  });
};

exports.removeForm = function* (next) {
  var result = yield this.client.findOne('customers', {
    id: this.params.customer
  });

  yield this.render('customers/remove', {
    modal: { title: 'Remove Customer' },
    customer: result
  });
};
