var query    = require('query');
var emitter  = require('emitter');
var delegate = require('delegate');

function Layout() {
  this.header = query('#customers-header');
  this.content = query('#customers-content');

  bindToFormInput(this.header, this);
  bindToFormSubmit(this.header, this);
}

emitter(Layout.prototype);

Layout.prototype.insert = function(element) {
  if (!this.content.contains(element)) {
    while (this.content.firstElementChild) {
      this.content.firstElementChild.remove();
    }
    this.content.appendChild(element);
  }
};

module.exports = Layout;

function bindToFormInput(element, view) {
  delegate.bind(element, 'form', 'input', function(e) {
    view.emit('filter', e.target.value);
  });
}

function bindToFormSubmit(element, view) {
  delegate.bind(element, 'form', 'submit', function(e) {
    view.emit('search', e.target.elements.search.value);
  });
}
