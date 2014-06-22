var http   = require('http');
var conure = require('conure');

module.exports = function(app) {

  app.on('error', function(error) {
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

      switch (this.accepts('json', 'html')) {
        case 'json':
          this.body = http.STATUS_CODES[this.status];
          break;
        case 'html':
          yield this.render('error', {
            error: err
          });
          break;
        default:
          this.status = 406;
      }
    }
  });

};
