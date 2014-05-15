import query   from 'query';
import emitter from 'emitter';

function Content() {
  this.element = query('#content');
}

emitter(Content.prototype);

Content.prototype.empty = function() {
  while (this.element.lastElementChild) {
    this.element.lastElementChild.remove();
  }

  return this.emit('emptied');
};

Content.prototype.append = function(element) {
  this.element.appendChild(element);

  return this.emit('appended');
};

export default Content;