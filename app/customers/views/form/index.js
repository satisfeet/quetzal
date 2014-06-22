var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template.jade');

function Form(model) {
  this.element = query('#customers-form') || domify(template({
    customer: model.attrs
  }));

  bindToInputEvent(this.element, model, this);
  bindToSubmitEvent(this.element, model, this);
}

emitter(Form.prototype);

Form.prototype.error = function(error) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = error;

  return this;
};

module.exports = Form;

function bindToInputEvent(element, model, view) {
  delegate.bind(element, 'input', 'input', function(e) {
    var name = e.target.name;
    var value = e.target.value;

    model.set(name, value);
  });
}

function bindToSubmitEvent(element, model, view) {
  delegate.bind(element, 'form', 'submit', function(e) {
    e.preventDefault();

    model.persist(function(err) {
      if (err) return view.error(err);

      view.emit('submit', model);
    });
  });
}
