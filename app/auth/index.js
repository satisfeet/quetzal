import store   from 'store';
import agent   from 'agent';
import emitter from 'emitter';

function Auth() {
  emitter(this);

  var self = this;

  this.agent = agent('/session');
  this.agent.on('error', function(err) {
    self.emit('error', err);
  });
}

Auth.prototype.token = function() {
  return store.get('session');
};

Auth.prototype.check = function() {
  if (!store.get('session')) {
    return this.emit('check', false);
  }

  var self = this;

  this.agent.get(function(ok, body) {
    self.emit('check', ok);
  });

  return this;
};

Auth.prototype.signin = function(account) {
  var self = this;

  this.agent.post(account, function(ok, body) {
    if (ok) store.set('session', body.token);

    self.emit('signin', ok);
  });

  return this;
};

Auth.prototype.signout = function() {
  store.remove('session');

  return this.emit('signout');
};

export default new Auth();
