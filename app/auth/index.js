import store   from 'store';
import request from 'superagent';

export function check(callback) {
  var session = store.get('session');

  if (!session) return callback(null, false);

  request.get('http://engine.satisfeet.me/session')
    .set('Authorization', 'Bearer ' + session)
    .end(function(err, res) {
      if (err) return callback(err);

      callback(null, res.ok);
    });
}

export function signIn(account, callback) {
  request.post('http://engine.satisfeet.me/session')
    .send(account)
    .end(function(err, res) {
      if (err) return callback(err);

      if (res.ok) {
        store.set('session', res.body.token);

        callback(null, true);
      } else {
        callback(null, false);
      }
    });
}

export function signOut(callback) {
  store.remove('session');

  callback(null);
}
