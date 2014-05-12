import query   from 'query';
import events  from 'events';
import domify  from 'domify';
import emitter from 'emitter';

import form from './form.jade';

function Signin() {
  this.element = domify(form());

  this.events = events(this.element, this);
  this.events.bind('submit form');
}

emitter(Signin.prototype);

Signin.prototype.error = function() {
  query('.help-text', this.element).classList.remove('hidden');

  return this.state('error');
};

Signin.prototype.state = function(state) {
  var result = query.all('.form-group', this.element);

  [].slice.call(result).forEach(function(element) {
    element.className = 'form-group has-' + state;
  });

  return this;
};

Signin.prototype.onsubmit = function(e) {
  if (e) e.preventDefault();

  this.emit('submit', {
    username: query('#username', this.element).value,
    password: query('#password', this.element).value
  });

  return this;
};

export default Signin;