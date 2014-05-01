var ejs    = require('koa-ejs');
var static = require('koa-static');

var builder = require('./builder');

module.exports = function(app) {

  ejs(app, app.views);

  app.use(builder(app.builder));

  app.use(static(app.static.path));

};
