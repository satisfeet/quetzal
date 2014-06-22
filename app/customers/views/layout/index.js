var query  = require('query');
var within = require('within-element');

function Layout() {
  this.element = query('#customers');
}

Layout.prototype.search = function(show) {
  var element = this.element.querySelector('#customers-header form');

  element.classList[show ? 'add' : 'remove']('show');

  return this;
};

Layout.prototype.insert = function(element) {
  var content = this.element.querySelector('#customers-content');

  if (!within(element, content)) {
    while (content.firstElementChild) {
      content.firstElementChild.remove();
    }
    content.appendChild(element);
  }

  return this;
};

module.exports = Layout;
