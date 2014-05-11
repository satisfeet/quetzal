import query  from 'query';
import domify from 'domify';

import row   from './row';
import table from './table';

function Table() {
  this.element = domify(table());
}

Table.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

Table.prototype.add = function(model) {
  query('tbody', this.element).appendChild(domify(row(model)));

  return this;
};

export default Table;
