var views  = require('koa-views');
var lessie = require('koa-lessie');
var static = require('koa-static');

module.exports = function(app) {

  app.use(views(app.views.path, app.views));

  if (app.env !== 'production') {
    app.use(static(app.static.path));
  }

  app.use(lessie(app.styles));

  app.use(locals);

};

function* locals(next) {
  var session = this.session;

  this.locals = {
    session: session,
    flash: session.flash || {},
  };

  session.flash = {};

  yield next;
}
