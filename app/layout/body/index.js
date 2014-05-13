import query from 'query';

function Body() {
  this.element = query('main');
}

Body.prototype.addBlur = function() {
  this.element.classList.add('blur');

  return this;
};

Body.prototype.removeBlur = function() {
  this.element.classList.remove('blur');

  return this;
};

export default Body;