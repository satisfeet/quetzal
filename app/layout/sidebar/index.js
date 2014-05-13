import query from 'query';

import nav from './nav';

function Sidebar(context) {
  this.element = query('#sidebar');
  this.element.innerHTML = nav(context);
}

Sidebar.prototype.select = function(path) {
  var result = this.element.querySelectorAll('.nav li > a');

  [].slice.call(result).forEach(function(element) {
    if (element.pathname === path) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  return this;
};

export default Sidebar;
