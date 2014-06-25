var domify   = require('domify');
var emitter  = require('emitter');
var delegate = require('delegate');

var template = require('./template');

function Input(model) {
  this.element = domify(template());

  bindToInputInput(this.element, model, this);
  bindToLabelInput(this.element, model, this);
}

emitter(Input.prototype);

module.exports = Input;

function bindToInputInput(element, model, view) {
  delegate.bind(element, 'input', 'input', function(e) {
    e.stopPropagation();

    var name = e.target.name.replace('-', '.');
    var value = e.target.value.split(', ');

    model.set(name, value);
  });
}

function bindToLabelInput(element, model, view) {
  delegate.bind(element, 'label', 'input', function(e) {
    e.stopPropagation();

    if (e.target.textContent) {
      var prev = e.target.htmlFor;
      var curr = e.target.textContent;
      var name = change(prev, curr);

      e.target.htmlfor = name;
      element.querySelector('input').name = name;

      var value = model.get(prev);

      if (value) {
        model.set(name.replace('-', '.'), value);
        model.set(prev.replace('-', '.'), null);
      }

      console.log(model.toJSON());

      view.emit('label');
    }
  });
}

function change(prev, curr) {
  var parts = prev.split('-');

  parts[1] = curr.toLowerCase();

  return parts.join('-');
}
