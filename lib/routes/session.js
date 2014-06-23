var router = require('koa-router');

var app = new router();

app.post('/', function* (next) {
  var result = this.client && (yield this.client.check());

  if (result) {
    this.session.username = this.request.body.username;
    this.session.password = this.request.body.password;

    switch (this.accepts('html', 'json')) {
      case 'html':
        this.redirect('/');
        break;
      case 'json':
        this.status = 204;
        break;
      default:
        this.throw(406);
    }
  } else {
    this.session.flash.error = 'Invalid credentials.';

    switch (this.accepts('html', 'json')) {
      case 'html':
        this.redirect('/session/sign-in');
        break;
      case 'json':
        this.status = 401;
        break;
      default:
        this.throw(406);
    }
  }
});

app.get('/', redirect, function* (next) {
  switch (this.accepts('html', 'json')) {
    case 'html':
      this.redirect('/');
      break;
    case 'json':
      this.status = 204;
      break;
    default:
      this.throw(406);
  }
});

app.del('/', redirect, function* (next) {
  this.session = null;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.redirect('/session/sign-in');
      break;
    case 'json':
      this.status = 204;
      break;
    default:
      this.throw(406);
  }
});

app.get('/sign-in', function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('session/sign-in', {
        overlay: true
      });
      break;
    default:
      this.throw(406);
  }
});

app.get('/sign-out', redirect, function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('session/sign-out', {
        overlay: true
      });
      break;
    default:
      this.throw(406);
  }
});

module.exports = app.middleware();

function* redirect(next) {
  if (this.session.username) return yield next;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.redirect('/session/sign-in');
      break;
    case 'json':
      this.throw(401);
      break;
    default:
      this.throw(406);
  }
}
