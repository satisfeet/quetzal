import query from 'query';

function Content() {
  this.element = query('#content');
}

Content.prototype.empty = function() {
  while (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }

  return this;
};

Content.prototype.append = function(element) {
  this.element.appendChild(element);

  return this;
};

export default Content;
