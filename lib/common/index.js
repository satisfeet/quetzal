var views  = require('koa-views');
var static = require('koa-static');

var builder = require('./builder');

module.exports = function(app) {

  app.use(builder(app.builder));

  app.use(views(app.views.path, app.views));

  app.use(static(app.static.path));

};