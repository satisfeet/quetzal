var https = require('https');

module.exports = function(app) {

  // use caching layer for production
  if (app.env === 'production') {
    app.use(require('koa-conditional')());
    app.use(require('koa-logger')());
    app.use(require('koa-etag')());
  }

  app.use(auth);
  app.use(proxy);

  // build components (css, js)
  app.use(require('./builder')(app.builder));

  // build extra bootstap css from less
  app.use(require('koa-lessie')(app.styles));

  // render jade templates as html
  app.use(require('koa-views')(app.views.path, app.views));

  // use simple static handling for development
  if (app.env !== 'production') {
    app.use(require('koa-static')(app.static.path));
  }

};

function* auth(next) {
  var response = yield request('/', this);

  if (response.statusCode === 401) {
    this.status = 401;
    this.set('WWW-Authenticate', 'Basic realm=manager');
  } else {
    yield next;
  }
}

function* proxy(next) {
  if (this.accepts('html', 'json') !== 'json') return yield next;

  var response = yield request(this.path, this);

  console.log(response.headers, response.statusCode);

  this.status = response.statusCode;
  this.type = 'json';
  this.body = response;
}

function request(path, context) {
  var request = https.request({
    path: path,
    hostname: 'engine.satisfeet.me',
    headers: {
      'Authorization': context.get('Authorization'),
      'Accept': 'application/json'
    }
  });

  console.log(request.path, request.headers);

  return function(callback) {
    request.once('error', function(error) {
      callback(error);
    });
    request.once('response', function(response) {
      callback(null, response);
    });
    request.end();
  }
}
