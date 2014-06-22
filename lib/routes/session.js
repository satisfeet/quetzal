var router = require('koa-router');

var app = new router();

app.post('/', function* (next) {
  var body = this.request.body;

  if (yield this.client.check()) {
    this.session.username = body.username;
    this.session.password = body.password;

    switch (this.accepts('html')) {
      case 'html':
        this.redirect('/');
        break;
      default:
        this.throw(406);
    }
  }

  this.session.flash.error = 'Invalid credentials.';

  switch (this.accepts('html')) {
    case 'html':
      this.redirect('/session');
      break;
    default:
      this.throw(406);
  }
});

app.del('/', redirect, function* (next) {
  this.session = null;

  switch (this.accepts('html')) {
    case 'html':
      this.redirect('/session/sign-in');
      break;
    default:
      this.throw(406);
  }
});

app.get('/sign-in', function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('session/sign-out');
      break;
    default:
      this.throw(406);
  }
});

app.get('/sign-out', redirect, function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('session/sign-out');
      break;
    default:
      this.throw(406);
  }
});

module.exports = app.middleware();

function* redirect(next) {
  if (this.session.username) return yield next;

  this.redirect('/session/sign-out');
}
