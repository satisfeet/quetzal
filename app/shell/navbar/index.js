import query from 'query';

var element = query('.navbar');

function Navbar() {
  this.element = element;

  this.actions = query('.navbar-right', this.element);
}

Navbar.prototype.showActions = function() {
  this.actions.classList.remove('hidden');

  return this;
};

Navbar.prototype.hideActions = function() {
  this.actions.classList.add('hidden');

  return this;
};

export default Navbar;
