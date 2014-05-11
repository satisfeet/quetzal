import query from 'query';

function Navbar() {
  this.element = query('.navbar');
}

Navbar.prototype.showActions = function() {
  query('.navbar-right', this.element).classList.remove('hidden');
};

Navbar.prototype.hideActions = function() {
  query('.navbar-right', this.element).classList.add('hidden');
}

export default Navbar;
