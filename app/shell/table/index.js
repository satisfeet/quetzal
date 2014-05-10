import domify from 'domify';

import row    from './row';
import table  from './table';

function Row(model) {
  this.element = domify(row(model));
}

function Table() {
  this.element = domify(table());
}

Table.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

Table.prototype.add = function(model) {
  this.element.appendChild(new Row(model).element);

  return this;
};

export default Table;
