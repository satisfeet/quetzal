var etag        = require('koa-etag');
var static      = require('koa-static');
var logger      = require('koa-logger');
var overwrite   = require('koa-overwrite');
var bodyparser  = require('koa-bodyparser');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  if (app.env === 'production') {
    app.use(conditional());
    app.use(logger());
    app.use(etag());
  }

  app.use(bodyparser());
  app.use(overwrite());

  require('./builder')(app);
  require('./session')(app);
  require('./render')(app);

  if (app.env !== 'production') {
    app.use(static(app.static.path));
  }

};
