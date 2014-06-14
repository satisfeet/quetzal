var superagent = require('superagent');

module.exports = function(app) {

  app.get('/customers', function* (next) {
    var result = yield request(this);

    yield this.render('customers/table', {
      customers: result.body
    });
  });

  app.get('/customers/:id', function* (next) {
    var result = yield request(this);

    yield this.render('customers/show', {
      customer: result.body
    });
  });

};

function request(context) {
  var username = context.session.username;
  var password = context.session.password;

  return function(callback) {
    superagent.get('https://engine.satisfeet.me' + context.path)
      .auth(username, password)
      .end(function(err, res) {
        callback(err, res);
      });
  }
}
