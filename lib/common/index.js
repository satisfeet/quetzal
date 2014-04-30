var static = require('koa-static');

module.exports = function(app) {

	app.use(static(app.static.path));

};
