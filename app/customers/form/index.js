var domify  = require('domify');
var emitter = require('emitter');

var form = require('./form');

function Form(model) {
  this.element = domify(form({
    customer: model
  }));

  bindToSubmitEvent(this.element, model, this);
}

emitter(Form.prototype);

Form.prototype.alert = function(message) {
  var element = this.element.querySelector('.alert');

  element.classList.remove('hidden');
  element.innerText = message;

  return this;
};

Form.prototype.resolve = function() {
  var element = this.element.querySelector('form');

  var entity = {
    name:  element.name.value,
    email: element.email.value,
  };

  if (element.city.value) {
    entity.address = {
      city: element.city.value
    };
    if (element.street.value && element.zip.value) {
      entity.address.street = element.street.value;
      entity.address.zip = element.zip.value;
    }
  }

  return entity;
};

module.exports = Form;

function bindToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    var entity = view.resolve();
    if (model && model.id) entity.id = model.id;

    view.emit('submit', entity, view);
  });
}