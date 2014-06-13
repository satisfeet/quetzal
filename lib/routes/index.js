module.exports = function(app) {

  app.use(function *(next) {
    if (!this.accepts('html')) return yield next;

    yield this.render('index', {
      name: app.name
    });
  });

};
