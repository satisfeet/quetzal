import store from 'store';
import agent from 'agent';

export function sign() {
  return store.get('session');
}

export function check(callback) {
  if (!store.get('session')) return callback(null, false);

  agent.get('/session').end(function(err, res) {
    if (err) return callback(err);

    callback(null, res.ok);
  });
}

export function signin(account, callback) {
  agent.post('/session').send(account).end(function(err, res) {
    if (err) return callback(err);

    if (res.ok) {
      store.set('session', res.body.token);

      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}

export function signout(callback) {
  store.remove('session');

  callback(null);
}