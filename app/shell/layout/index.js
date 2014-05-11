import query  from 'query';
import domify from 'domify';

function Layout() {
  this.element = query('#content');
}

Layout.prototype.empty = function() {
  while (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }

  return this;
};

Layout.prototype.append = function(el) {
  this.element.appendChild(el);

  return this;
};

Layout.prototype.insert = function(html) {
  this.element.appendChild(domify(html));

  return this;
};

export default Layout;
