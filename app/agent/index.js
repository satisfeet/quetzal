import store   from 'store';
import emitter from 'emitter';
import request from 'superagent';

function Agent(path) {
  if (!(this instanceof Agent)) return new Agent(path);

  this.resource = 'http://engine.satisfeet.me' + (path || '');

  emitter(this);
}

Agent.prototype.post = function(path, object, callback) {
  if (arguments.length === 2) {
    callback = object;
    object = path;
    path = '';
  }

  sign(request.post(this.resource + path))
    .send(object)
    .end(handle(this, callback));

  return this;
};

Agent.prototype.get = function(path, callback) {
  if (arguments.length === 1) {
    callback = path;
    path = '';
  }

  if (path && path.charAt(0) !== '/') path = '/' + path;

  sign(request.get(this.resource + path))
    .end(handle(this, callback));

  return this;
};

Agent.prototype.put = function(path, object, callback) {
  if (path && path.charAt(0) !== '/') path = '/' + path;

  sign(request.put(this.resource + path))
    .send(object)
    .end(handle(this, callback));

  return this;
};

Agent.prototype.del = function(path, callback) {
  if (path && path.charAt(0) !== '/') path = '/' + path;

  sign(request.del(this.resource + path))
    .end(handle(this, callback));

  return this;
};

export default Agent;

function sign(req) {
  var token = store.get('session');

  if (token) req.set('Authorization', 'Bearer ' + token);

  return req;
}

function handle(agent, callback) {
  return function(err, res) {
    if (err) return agent.emit('error', err);

    callback(res.ok, res.body, res.status);
  }
}
