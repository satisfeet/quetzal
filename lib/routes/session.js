var superagent = require('superagent');

module.exports = function(app) {

  app.get('/session', function* (next) {
    if (this.session.secure) {
      return this.redirect('/');
    }

    yield this.render('session/signin', {
      modal: { title: 'Sign-In' }
    });
  });

  app.put('/session', function* (next) {
    var response = yield request(this);

    if (response.ok) {
      this.session.secure = true;
      this.session.username = this.request.body.username;
      this.session.password = this.request.body.password;

      this.redirect('/');
    } else {
      this.session.flash.error = 'Invalid credentials.';

      this.redirect('/session');
    }
  });

  app.del('/session', function* (next) {
    this.session = null;

    this.redirect('/session');
  });

};

function request(context) {
  var username = context.request.body.username;
  var password = context.request.body.password;

  return function(callback) {
    superagent.get('https://engine.satisfeet.me/')
      .auth(username, password)
      .end(function(err, res) {
        callback(err, res);
      });
  }
}
