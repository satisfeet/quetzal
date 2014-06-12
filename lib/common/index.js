var etag        = require('koa-etag');
var views       = require('koa-views');
var lessie      = require('koa-lessie');
var logger      = require('koa-logger');
var static      = require('koa-static');
var conditional = require('koa-conditional-get');

var builder = require('./builder');

module.exports = function(app) {

  // use caching layer for production
  if (app.env === 'production') {
    app.use(logger());
    app.use(conditional());
    app.use(etag());
  }

  // build components (css, js)
  app.use(builder(app.builder));

  // build extra bootstap css from less
  app.use(lessie(app.styles));

  // render jade templates as html
  app.use(views(app.views.path, app.views));

  // use simple static handling for development
  if (app.env !== 'production') {
    app.use(static(app.static.path));
  }

};
