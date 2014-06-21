var overwrite  = require('koa-overwrite');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  app.use(bodyparser());

  app.use(overwrite());

};
