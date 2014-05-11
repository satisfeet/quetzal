import store      as store   from 'store';
import superagent as request from 'superagent';

function Agent() {
  this.resource = 'http://engine.satisfeet.me';
}

Agent.prototype.post = function(path) {
  var req = request.post(this.resource + path);

  return sign(req);
};

Agent.prototype.get = function(path) {
  var req = request.get(this.resource + path);

  return sign(req);
};

Agent.prototype.put = function(path) {
  var req = request.put(this.resource + path);

  return sign(req);
};

Agent.prototype.del = function(path) {
  var req = request.del(this.resource + path);

  return sign(req);
};

export default new Agent();

function sign(req) {
  var token = store.get('session');

  if (token) req.set('Authorization', 'Bearer ' + token);

  return req;
}