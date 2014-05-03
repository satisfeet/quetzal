import domify     from 'domify';
import superagent from 'superagent';

import template from './template';

function Auth() {
  this.element = domify(template());

  this.state = false;
  this.username = null;
  this.password = null;

  bindToInputEvent(this.element, this);
  bindToSubmitEvent(this.element, this);
}

export default Auth;

function authenticate(account, callback) {
  superagent.head('http://engine.satisfeet.me')
    .auth(account.username, account.password)
    .accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      callback(null, !res.unauthorized);
    });
}

function bindToInputEvent(element, view) {
  element.querySelector('form')
    .addEventListener('input', function(e) {
      view[e.target.name] = e.target.value;
    });
}

function bindToSubmitEvent(element, view) {
  element.querySelector('form')
    .addEventListener('submit', function(e) {
      e.preventDefault();

      authenticate(view, function(err, success) {
        if (!success) return view.failure();

        view.state = true;
      });
    });
}
