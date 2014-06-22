var conure = require('conure');

module.exports = function(app) {

  app.use(client);

};

function* client(next) {
  var sess = this.session || {};
  var body = this.request.body || {};

  if (sess.username || body.username) {
    this.client = conure.createClient({
      username: sess.username || body.username,
      password: sess.password || body.password
    });
  }

  yield next;
}
