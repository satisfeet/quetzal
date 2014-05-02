function Layout(element) {
  this.element = element.querySelector('#content');
}

Layout.prototype.empty = function() {
  while (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }

  return this;
};

Layout.prototype.append = function(element) {
  this.element.appendChild(element);

  return this;
};

Layout.prototype.insert = function(element) {
  return this.empty().append(element);
};

export default Layout;
