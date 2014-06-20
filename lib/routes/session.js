var https = require('https');

exports.index = function* (next) {
  if (this.session.secure) {
    return this.redirect('/');
  }

  yield this.render('session/signin', {
    modal: { title: 'Sign-In' }
  });
};

exports.create = function* (next) {
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
};

exports.remove = function* (next) {
  this.session = null;

  this.redirect('/session');
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
