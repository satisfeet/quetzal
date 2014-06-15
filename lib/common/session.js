var sess  = require('koa-sess');
var redis = require('koa-redis');

module.exports = function(app) {

  app.use(sess({
    store: redis()
  }));

};
