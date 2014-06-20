var router = require('koa-router');

module.exports = function(app) {

  app.use(redirect);

  app.use(router(app));

  require('./session')(app);

  require('./products')(app);

  require('./customers')(app);

  app.get('/', function* (next) {
    yield this.render('index');
  });

};

function* redirect(next) {
  if (this.method === 'POST' && this.path === '/session') {
    return yield next;
  }
  if (this.method === 'GET' && this.path === '/session/sign-in') {
    return yield next;
  }
  if (this.session.secure) {
    return yield next;
  }

  this.redirect('/session/sign-in');
}
