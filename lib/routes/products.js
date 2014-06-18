exports.index = function* (next) {
  var results = yield this.client.find('products', {
    filter: this.query.filter
  });

  yield this.render('products/index', {
    products: results
  });
};

exports.display = function* (next) {

};

exports.create = function* (next) {

};

exports.update = function* (next) {

};

exports.remove = function* (next) {

};

exports.createForm = function* (next) {
  yield this.render('products/form');
};

exports.updateForm = function* (next) {
  yield this.render('products/form');
};

exports.removeForm = function* (next) {
  yield this.render('products/remove');
};
