var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function SignIn() {
  this.element = domify(form());

  bindToSubmitEvent(this.element, this);
}

emitter(SignIn.prototype);

SignIn.prototype.state = function(state) {
  var result = this.element.querySelectorAll('.form-group');

  [].slice.call(result).forEach(function(element) {
    element.className = 'form-group has-' + state;
  });

  return this;
};

SignIn.prototype.alert = function(state, message) {
  var element = this.element.querySelector('.alert');

  element.className = 'alert alert-' + state;
  element.innerText = message;

  return this;
};

SignIn.prototype.resolve = function() {
  var element = this.element.querySelector('form');

  return {
    username: element.username.value,
    password: element.password.value
  };
};

module.exports = SignIn;

function bindToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve());
  });
}
