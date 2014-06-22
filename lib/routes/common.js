var router = require('koa-router');

var app = new router();

app.get('/', function* (next) {
  switch (this.accepts('html')) {
    case 'html':
      yield this.render('index');
      break;
    default:
      this.throw(406);
  }
});

module.exports = app.middleware();
