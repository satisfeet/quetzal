import domify from 'domify';

import item from './item';
import list from './list';

function Item(model) {
  this.element = domify(item({
    product: model
  }));
}

function List(models) {
  this.element = domify(list());

  this.list(models);
}

List.prototype.add = function(model) {
  this.element.appendChild(new Item(model).element);

  return this;
};

List.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

export default List;
