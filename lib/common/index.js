var logger = require('koa-logger');
var static = require('koa-static');

module.exports = function(app) {

  if (app.env === 'production') {
    app.use(logger());
  }

  require('./cache')(app);

  require('./parser')(app);

  require('./session')(app);

  require('./render')(app);

  require('./build')(app);

  if (app.env !== 'production') {
    app.use(static(app.static.path));
  }

};
