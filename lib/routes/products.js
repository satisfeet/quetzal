module.exports = function(app) {

  app.get('/products', function* (next) {
    var result = yield this.client.find('products');

    yield this.render('products/index', {
      products: result
    });
  });

};
