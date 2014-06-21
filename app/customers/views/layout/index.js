var query  = require('query');
var within = require('within-element');

function Layout() {
  this.element = query('#customers-content');
}

Layout.prototype.insert = function(element) {
  if (!within(element, this.element)) {
    while (this.element.firstElementChild) {
      this.element.firstElementChild.remove();
    }
    this.element.appendChild(element);
  }
};

module.exports = Layout;
