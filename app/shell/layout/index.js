import query  from 'query';
import domify from 'domify';

import content from './content';
import sidebar from './sidebar';

function Layout() {
  this.element = query('main');

  this.setup();
}

Layout.prototype.setup = function() {
  this.sidebar = domify(sidebar());
  this.content = domify(content());

  this.element.innerHTML = '';
  this.element.appendChild(this.sidebar);
  this.element.appendChild(this.content);

  return this;
};

Layout.prototype.empty = function() {
  var element = this.content.firstElementChild;

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return this;
};

Layout.prototype.append = function(element) {
  this.content.firstElementChild.appendChild(element);

  return this;
};

Layout.prototype.insert = function(html) {
  this.content.firstElementChild.appendChild(domify(html));

  return this;
};

Layout.prototype.overlay = function(element) {
  while (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }

  this.element.appendChild(element);

  return this;
};

export default Layout;