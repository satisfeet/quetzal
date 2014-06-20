var https = require('https');

module.exports = function(app) {

  app.post('/session', function* (next) {
    var result = yield request(this.request.body);

    if (result) {
      this.session.secure = true;
      this.session.username = this.request.body.username;
      this.session.password = this.request.body.password;

      this.redirect('/');
    } else {
      this.session.flash.error = 'Invalid credentials.';

      this.redirect('/session');
    }
  });

  app.delete('/session', function* (next) {
    this.session = null;

    this.redirect('/session/sign-in');
  });

  app.get('/session/sign-in', function* (next) {
    if (this.session.secure) return this.redirect('/');

    yield this.render('session/sign-in');
  });

  app.get('/session/sign-out', function* (next) {
    yield this.render('session/sign-out');
  });

};

function request(body) {
  var req = https.request({
    host: 'engine.satisfeet.me',
    auth: body.username + ':' + body.password,
  });

  return function(callback) {
    req.once('response', function(res) {
      callback(null, res.statusCode === 204);
    });
    req.once('error', function(err) {
      callback(err);
    });
    req.end();
  }
}
