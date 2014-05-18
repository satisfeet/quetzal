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

module.exports = Form;

function bindToSubmitEvent(element, model, view) {
  model = model || {};

  element.addEventListener('submit', function(e) {
    e.preventDefault();

    model.name = element.name.value;
    model.email = element.email.value;

    if (element.city.value) {
      var address = model.address || {};

      address.city = element.city.value;

      if (element.street.value && element.zip.value) {
        address.street = element.street.value;
        address.zip = element.zip.value;
      }
    }

    view.emit('submit', model, view);
  });
}
