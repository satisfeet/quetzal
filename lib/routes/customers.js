module.exports = function(app) {

  app.get('/customers', function* (next) {
    var result = yield this.client.find('customers', {

    });

    yield this.render('customers/index', {
      customers: result
    });
  });

};
