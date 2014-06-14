var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  require('./session')(app);

  require('./products')(app);

  require('./customers')(app);

  app.get('/', function* (next) {
    yield this.render('index', {
      name: app.name
    });
  });

};
