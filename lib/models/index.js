var conure = require('conure');

module.exports = function(app) {

  app.context.client = conure.createClient({
    username: app.auth.username,
    password: app.auth.password
  });

};
