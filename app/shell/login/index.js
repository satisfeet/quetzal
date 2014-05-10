import query   from 'query';
import domify  from 'domify';
import emitter from 'emitter';

import form from './form.jade';

function Login() {
  this.element = domify(form());

  emitter(this);
  bindToSubmitEvent(this.element, this);
}

Login.prototype.error = function() {
  query('.help-text', this.element).classList.remove('hidden');

  return this.state('error');
};

Login.prototype.state = function(state) {
  var result = query.all('.form-group', this.element);

  [].slice.call(result).forEach(function(element) {
    element.className = 'form-group has-' + state;
  });

  return this;
};

export default Login;

function bindToSubmitEvent(element, view) {
  var form = query('form', element);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', {
      username: query('#username', form).value,
      password: query('#password', form).value
    });
  });
}
