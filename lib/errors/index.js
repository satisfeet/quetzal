var http   = require('http');
var conure = require('conure');

module.exports = function(app) {

  app.on('error', function(error) {
    if (error.message) console.error(error.message);
    if (error.stack) console.error(error.stack);
  });

  app.use(function* (next) {
    try {
      yield next;
    } catch(err) {
      if (err.name.startsWith('Conure')) {
        if (err instanceof conure.InvalidRequestError) {
          err.status = 400;
          err.expose = true;
        }
        if (err instanceof conure.NotFoundError) {
          err.status = 404;
          err.expose = false;
        }
      }

      this.status = err.status || 500;

      if (err.expose !== false) {
        this.app.emit('error', err, this);
      }

      switch (this.accepts('json', 'html')) {
        case 'html':
          yield this.render('error', {
            error: err
          });
          break;
        case 'json':
          this.body = http.STATUS_CODES[this.status];
          break;
      }
    }
  });

};
