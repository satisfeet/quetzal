import query from 'query';

function Body() {
  this.element = query('main');
}

Body.prototype.toggleBlur = function() {
  this.element.classList.toggle('blur');

  return this;
};

export default Body;