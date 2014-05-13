import query  from 'query';
import events from 'events';

function Navbar() {
  this.element = query('.navbar');

  this.events = events(this.element, this);
  this.events.bind('click .dropdown-toggle', 'toggleActions');
  this.events.bind('click .dropdown-menu li > a', 'toggleActions');
}

Navbar.prototype.toggleActions = function(e) {
  // we only want to prevent the default event on .dropdown-toggle
  if (e && e.target.className) e.preventDefault();

  if (this.active) {
    query('.dropdown', this.element).classList.toggle('open');
  }

  return this;
};

Navbar.prototype.toggleActionsState = function(active) {
  this.active = active;

  var element = query('.dropdown', this.element);

  if (!this.active) {
    element.classList.add('disabled');
  } else {
    element.classList.remove('disabled');
  }

  return this;
};

export default Navbar;
