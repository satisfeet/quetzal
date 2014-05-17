var query = require('query');

function Navbar() {
  this.element = query('.navbar');

  bindToDropdownClickEvent(this.element, this);
  bindToDropdownMenuClickEvent(this.element, this);
}

Navbar.prototype.setActions = function(name) {
  this.element.querySelector('#user').innerText = name;

  return this;
};

Navbar.prototype.toggleActions = function() {
  if (this.active) {
    this.element.querySelector('.dropdown').classList.toggle('open');
  }

  return this;
};

Navbar.prototype.toggleActionsState = function(active) {
  this.active = active;

  if (!this.active) {
    this.element.querySelector('.dropdown').classList.add('hidden');
  } else {
    this.element.querySelector('.dropdown').classList.remove('hidden');
  }

  return this;
};

module.exports = Navbar;

function bindToDropdownClickEvent(element, view) {
  element.querySelector('.dropdown-toggle')
    .addEventListener('click', function(e) {
      e.preventDefault();

      view.toggleActions();
    });
}

function bindToDropdownMenuClickEvent(element, view) {
  element.querySelector('.dropdown-menu')
    .addEventListener('click', function(e) {
      if (e.target instanceof HTMLAnchorElement) {
        view.toggleActions();
      }
    });
}
