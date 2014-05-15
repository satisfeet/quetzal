var etag     = require('koa-etag');
var views    = require('koa-views');
var static   = require('koa-static');
var compress = require('koa-compress');

var style   = require('./style');
var script  = require('./script');
var resolve = require('./resolve');

module.exports = function(app) {

  app.use(resolve(app.builder));
  app.use(script(app.builder));
  app.use(style(app.builder));

  if (app.env === 'production') {
    app.use(etag());
    app.use(compress());
  }

  app.use(views(app.views.path, app.views));

  app.use(static(app.static.path));

};
