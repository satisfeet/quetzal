import domify  from 'domify';
import emitter from 'emitter';

import form from './form.jade';

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
  var element = this.element;

  return {
    username: element.username.value,
    password: element.password.value
  };
};

export default SignIn;

function bindToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.resolve());
  });
}
