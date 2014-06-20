var etag        = require('koa-etag');
var logger      = require('koa-logger');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  if (app.env === 'production') {
    app.use(conditional());
    app.use(logger());
    app.use(etag());
  }

  require('./session')(app);

  require('./parser')(app);

  require('./render')(app);

  app.use(redirect);

};

function* redirect(next) {
  if (this.session.secure) {
    return yield next;
  }
  if (this.path === '/session') {
    if (this.method === 'GET' || this.method === 'POST') {
      return yield next;
    }
  }

  this.redirect('/session');
}
