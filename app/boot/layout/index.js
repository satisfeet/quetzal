import query from 'query';

var element = query('#content');

export function empty() {
  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return exports;
}

export function insert(el) {
  element.appendChild(el);

  return exports;
};
