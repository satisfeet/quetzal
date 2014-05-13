import store   from 'store';
import agent   from 'agent';
import emitter from 'emitter';

function Auth() {
  emitter(this);

  this.agent = agent('/session');
  this.agent.on('error', function(err) {
    this.emit('error', err);
  }.bind(this));
}

Auth.prototype.token = function() {
  return store.get('session');
};

Auth.prototype.check = function() {
  if (!store.get('session')) {
    return this.emit('check', false);
  }

  this.agent.get(function(ok, body) {
    if (!ok) store.set('session', null);
  
    this.emit('check', ok);
  }.bind(this));

  return this;
};

Auth.prototype.signin = function(account) {
  this.agent.post(account, function(ok, body) {
    if (ok) store.set('session', body.token);

    this.emit('signin', ok);
  }.bind(this));

  return this;
};

Auth.prototype.signout = function() {
  store.remove('session');

  return this.emit('signout');
};

export default Auth;