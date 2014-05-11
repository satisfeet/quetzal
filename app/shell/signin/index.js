import query    from 'query';
import domify   from 'domify';
import emitter  from 'emitter';
import delegate from 'delegate';

import form from './form.jade';

function Signin() {
  this.element = domify(form());

  delegate.bind(this.element, 'form', 'submit', this.submit);
}

emitter(Signin.prototype);

Signin.prototype.error = function() {
  query('.help-text', this.element).classList.remove('hidden');

  return this.state('error');
};

Signin.prototype.state = function() {
  var result = query.all('.form-group', this.element);

  [].slice.call(result).forEach(function(element) {
    element.className = 'form-group has-' + state;
  });

  return this;
};

Signin.prototype.submit = function(e) {
  if (e) e.preventDefault();

  view.emit('submit', {
    username: query('#username', this.element).value,
    password: query('#password', this.element).value
  });

  return this;
};

export default Signin;
