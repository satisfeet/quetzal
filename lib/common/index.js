var static = require('koa-static');

module.exports = function(app) {

  app.use(require('./builder')(app.builder));

	app.use(static(app.static.path));

};
