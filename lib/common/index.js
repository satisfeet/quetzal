var views  = require('koa-views');
var lessie = require('koa-lessie');

var style   = require('./style');
var script  = require('./script');
var resolve = require('./resolve');

module.exports = function(app) {

  // needs to be registered before builder middleware
  if (app.env === 'production') {
    app.use(require('koa-static-cache')(app.static));
  }

  app.use(resolve(app.builder));
  app.use(script(app.builder));
  app.use(style(app.builder));

  app.use(views(app.views.path, app.views));
  app.use(lessie(app.styles));

  // needs to be registered after builder middleware
  if (app.env !== 'production') {
    app.use(require('koa-static')(app.static.dir));
  }

};
