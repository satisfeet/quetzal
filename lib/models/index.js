var conure = require('conure');

module.exports = function(app) {

  app.use(client);

};

function* client(next) {
  if (this.session.secure) {
    this.client = conure.createClient({
      username: this.session.username,
      password: this.session.password
    });
  }

  yield next;
}
