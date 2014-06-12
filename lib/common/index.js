var views  = require('koa-views');
var lessie = require('koa-lessie');

var builder = require('./builder');

module.exports = function(app) {

  // build components (css, js)
  app.use(builder(app.builder));

  // build extra bootstrap less (css)
  app.use(lessie(app.styles));

  // needs to be registered before builder middleware
  if (app.env === 'production') {
    app.use(require('koa-static-cache')(app.static));
  }

  // render initial jade template (html)
  app.use(views(app.views.path, app.views));

  // needs to be registered after builder middleware
  if (app.env !== 'production') {
    app.use(require('koa-static')(app.static.dir));
  }

};
