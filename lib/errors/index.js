var http   = require('http');
var conure = require('conure');

module.exports = function(app) {

  app.on('error', function(error) {
    console.error(error);
    if (error.stack) console.error(error.stack);
  });

  app.use(function* (next) {
    try {
      yield next;
    } catch(err) {
      switch (err.status / 100 | 0) {
        case 4:
          err.expose = false;
          break;
        default:
          err.expose = true;
      }

      this.status = err.status || 500;

      if (err.expose) {
        this.app.emit('error', err, this);
      }

      switch (this.accepts('html', 'json', 'text')) {
        case 'html':
          yield this.render('error', {
            error: err
          });
          break;
        case 'json':
          this.body = { error: err.toString() };
          break;
        case 'text':
          this.body = err.toString();
          break;
        default:
          this.status = 406;
      }
    }
  });

};
