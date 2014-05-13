import query  from 'query';
import events from 'events';

function Navbar() {
  this.element = query('.navbar');

  this.events = events(this.element, this);
  this.events.bind('click .dropdown-toggle', 'toggleActions');
}

Navbar.prototype.toggleActions = function() {
  if (this.active) query('.dropdown', this.element).classList.toggle('open');

  return this;
};

export default Navbar;