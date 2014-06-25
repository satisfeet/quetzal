var Input    = require('input');
var query    = require('query');
var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template');

function Form(model) {
  this.element = query('#products-form') || domify(template());

  append(this.element, model, this);

  bindToInput(this.element, model, this);
  bindToSubmit(this.element, model, this);
}

emitter(Form.prototype);

Form.prototype.alert = function(error) {
  var element = query('.alert', this.element);

  element.classList.remove('hidden');
  element.innerText = error.toString();
};

module.exports = Form;

function append(element, model, view) {
  var input = new Input(model);

  input.once('label', function() {
    append(element, model, view);
  });

  var parent = query('fieldset', element);
  var reference = parent.lastElementChild;

  parent.insertBefore(input.element, reference);
}

function bindToInput(element, model, view) {
  delegate.bind(element, 'form', 'input', function(e) {
    var key = e.target.name;
    var value = e.target.value;

    if (e.target.type === 'number') {
      value = Number.parseFloat(value);
    }

    model.set(key, value);
  });
}

function bindToSubmit(element, model, view) {
  delegate.bind(element, 'form', 'submit', function(e) {
    e.preventDefault();

    view.emit('create', model);
  });
}
