var store   = require('store');
var rester  = require('rester');
var emitter = require('emitter');

function Auth() {
  var self = this;

  this.agent = rester('https://engine.satisfeet.me/session');
  this.agent.on('error', function(error) {
    self.emit('error', error);
  });
}

emitter(Auth.prototype);

Auth.prototype.user = function() {
  return store.get('user');
};

Auth.prototype.token = function() {
  return store.get('session');
};

Auth.prototype.check = function() {
  var self = this;

  if (!store.get('session')) {
    return this.emit('check', false);
  }

  this.agent.find()
    .set('Authorization', 'Bearer ' + this.token())
    .end(function(respond) {
      if (!respond.ok) store.set('session', null);

      self.emit('check', respond.ok);
    });

  return this;
};

Auth.prototype.signin = function(account) {
  var self = this;

  this.agent.persist(account, function(respond) {
    if (respond.ok) {
      store.set('user', account.username);
      store.set('session', respond.body.token);
    }

    self.emit('signin', respond.ok);
  });

  return this;
};

Auth.prototype.signout = function() {
  store.remove('session');

  return this.emit('signout');
};

module.exports = Auth;
