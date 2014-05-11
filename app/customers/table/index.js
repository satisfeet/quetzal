import page   from 'page';
import query  from 'query';
import domify from 'domify';
import events from 'events';

import row   from './row';
import table from './table';

function Row(model) {
  this.element = domify(row(model));

  this.events = events(this.element, this);
  this.events.bind('click', 'open');
}

Row.prototype.open = function(e) {
  page('/customers/' + this.element.dataset.id);

  return this;
};

function Table() {
  this.element = domify(table());
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
