import query   from 'query';
import domify  from 'domify';
import emitter from 'emitter';

import form from './form.jade';

function Login() {
  emitter(this)

  this.element = domify(form());

  bindToSubmitEvent(this.element, this);
}

Login.prototype.error = function() {
  [].slice.call(query.all('.form-group', this.element))
    .forEach(function(element) {
      element.classList.add('has-error');
    });

  return this;
};

Login.prototype.failure = function() {
  [].slice.call(query.all('.form-group', this.element))
    .forEach(function(element) {
      element.classList.add('has-warning');
    });

  return this;
};

Login.prototype.success = function() {
  [].slice.call(query.all('.form-group', this.element))
    .forEach(function(element) {
      element.classList.add('has-success');
    });

  return this;
};

export default Login;

function bindToSubmitEvent(element, view) {
  var form = query('form', element);

  console.log('bound');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', {
      username: e.target[0].value,
      password: e.target[1].value
    });
  });
}
