var domify  = require('domify');
var emitter = require('emitter');

var destroy = require('./destroy');

function Destroy(model) {
  this.element = domify(destroy({
    customer: model
  }));

  bindToSubmitEvent(this.element, model, this);
}

emitter(Destroy.prototype);

module.exports = Destroy;

function bindToSubmitEvent(element, model, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', model, view);
  });
}
