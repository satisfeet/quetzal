var lodash = require('lodash');
var views  = require('koa-views');
var static = require('koa-static');

module.exports = function(app) {

  app.use(views(app.views.path, app.views));

  app.use(locals);

};

function* locals(next) {
  // copy session data
  this.locals = lodash.clone(this.session);
  this.locals.flash = this.locals.flash || {};

  // reset flash session
  this.session.flash = {};

  yield next;

}
