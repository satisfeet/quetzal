import query from 'query';

var element = query('#content');

exports.empty = function() {
  while (element.lastElement) {
    element.lastElement.remove();
  }

  return exports;
};

exports.insert = function(el) {
  element.appendChild(el);

  return exports;
};
