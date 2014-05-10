import store   from 'store';
import request from 'superagent';

var resource = 'http://engine.satisfeet.me';

export function post(path) {
  var req = request.post(resource + path);

  return sign(req);
}

export function get(path) {
  var req = request.get(resource + path);

  return sign(req);
}

export function put(path) {
  var req = request.put(resource + path);

  return sign(req);
}

export function del(path) {
  var req = request.del(resource + path);

  return sign(req);
}

function sign(req) {
  var token = store.get('session');

  if (token) req.set('Authorization', 'Bearer ' + token);

  return req;
}
