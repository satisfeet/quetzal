var mount = require('koa-mount');

module.exports = function(app) {

  app.use(secure);

  app.use(mount('/', require('./common')));

  app.use(mount('/session', require('./session')));

  app.use(mount('/products', require('./products')));

  app.use(mount('/customers', require('./customers')));

};

function* secure(next) {
  if (this.session.username) return yield next;
  if (this.path.startsWith('/session')) return yield next;

  this.redirect('/session/sign-in');
}
