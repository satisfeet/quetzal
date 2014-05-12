import store   from 'store';
import agent   from 'agent';
import emitter from 'emitter';

function Auth() {
  emitter(this);
}

Auth.prototype.token = function() {
  return store.get('session');
};

Auth.prototype.check = function() {
  if (!store.get('session')) {
    return this.emit('check', false);
  }

  var self = this;

  agent.get('/session').end(function(err, res) {
    if (err) return self.emit('error', err);

    self.emit('check', res.ok);
  });

  return this;
};

Auth.prototype.signin = function(account) {
  var self = this;

  agent.post('/session').send(account).end(function(err, res) {
    if (err) return self.emit('error', err);
    if (!res.ok) return self.emit('signin', false);

    store.set('session', res.body.token);
    self.emit('signin', true);
  });

  return this;
};

Auth.prototype.signout = function() {
  store.remove('session');

  return this.emit('signout');
};

export default new Auth();