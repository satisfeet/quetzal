var query  = require('query');

var navbar   = query('.navbar');
var dropdown = query('.navbar .dropdown', navbar);

navbar.querySelector('.dropdown-menu')
  .addEventListener('click', function(e) {
    console.log('click');
    if (e.target instanceof HTMLAnchorElement) {
      dropdown.classList.toggle('open');
    }
  });

navbar.querySelector('.dropdown-toggle')
  .addEventListener('click', function(e) {
    console.log('click t');
    dropdown.classList.toggle('open');
  });
