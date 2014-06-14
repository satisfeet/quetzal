var etag        = require('koa-etag');
var views       = require('koa-views');
var redis       = require('koa-redis');
var logger      = require('koa-logger');
var lessie      = require('koa-lessie');
var static      = require('koa-static');
var parser      = require('koa-bodyparser');
var session     = require('koa-sess');
var override    = require('koa-override-method');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  // production changes middleware stack
  if (app.env === 'production') {
    app.use(conditional());
    app.use(logger());
    app.use(etag());
  } else {
    app.use(static(app.static.path));
  }

  // parse request bodies
  app.use(parser());

  // enable redis session store
  app.use(session({
    store: redis()
  }));

  // compile bootstrap less files
  app.use(lessie(app.styles));

  // helper to render templates in koa
  app.use(views(app.views.path, app.views));

  // apply form method override
  app.use(method);

  // setups view locals
  app.use(locals);

  // redirect all unauthenticated sessions
  app.use(redirect);

};

function* method(next) {
  if (this.request.body) {
    this.request.method = override.call(this, this.request.body);
  }

  yield next;
}

function* locals(next) {
  this.locals.flash   = this.session.flash || {};
  this.locals.session = this.session;

  this.session.flash = {};

  yield next;
}

function* redirect(next) {
  if (this.session.secure) {
    return yield next;
  }
  if (this.path === '/session') {
    if (this.method === 'GET' || this.method === 'PUT') {
      return yield next;
    }
  }

  this.redirect('/session');
}
