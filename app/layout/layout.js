import query  from 'query';
import domify from 'domify';

function Layout() {
  this.element = query('#main');
  this.sidebar = query('#sidebar', this.element);
  this.content = query('#content', this.element);
}

Layout.prototype.empty = function() {
  while (this.content.lastElementChild) {
    this.content.lastElementChild.remove();
  }

  return this;
};

Layout.prototype.append = function(element) {
  this.content.appendChild(element);

  return this;
};

Layout.prototype.insert = function(element) {
  return this.empty().append(element);
};

Layout.prototype.replace = function(html) {
  return this.insert(domify(html));
};

Layout.prototype.openOverlay = function(element) {
  this.sidebar.classList.add('blur');
  this.content.classList.add('blur');

  this.element.appendChild(element);

  setTimeout(function() {
    element.classList.add('overlay-in');
  }, 500);

  return this;
};

Layout.prototype.closeOverlay = function() {
  this.sidebar.classList.remove('blur');
  this.content.classList.remove('blur');
  this.element.lastElementChild.remove();

  return this;
};

export default Layout;
