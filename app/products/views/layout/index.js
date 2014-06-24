var query = require('query');

function Layout() {
  var element = query('#products');

  this.header = query('#products-header', element);
  this.content = query('#products-content', element);
}

Layout.prototype.insert = function(element) {
  if (!this.content.contains(element)) {
    while (this.content.firstElementChild) {
      this.content.firstElementChild.remove();
    }
    this.content.appendChild(element);
  }
};

module.exports = Layout;
