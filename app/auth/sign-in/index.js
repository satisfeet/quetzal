import query   from 'query';
import events  from 'events';
import domify  from 'domify';
import emitter from 'emitter';

import form from './form.jade';

function SignIn() {
  this.element = domify(form());

  this.events = events(this.element, this);
  this.events.bind('submit');
}

emitter(SignIn.prototype);

SignIn.prototype.state = function(state) {
  var result = query.all('.form-group', this.element);

  [].slice.call(result).forEach(function(element) {
    element.className = 'form-group has-' + state;
  });

  return this;
};

SignIn.prototype.alert = function(state, message) {
  var element = query('.alert', this.element);

  element.className = 'alert alert-' + state;
  element.innerText = message;

  return this;
};

SignIn.prototype.onsubmit = function(e) {
  if (e) e.preventDefault();

  this.emit('submit', {
    username: query('#username', this.element).value,
    password: query('#password', this.element).value
  });

  return this;
};

export default SignIn;