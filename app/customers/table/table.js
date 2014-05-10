import query  from 'query';
import domify from 'domify';

import Row      from './row.js';
import template from './table.jade';

function Table() {
  this.element = domify(template());
}

Table.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

Table.prototype.add = function(model) {
  query('tbody', this.element).appendChild(new Row(model).element);

  return this;
};

export default Table;
