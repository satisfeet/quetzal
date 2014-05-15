import page   from 'page';
import domify from 'domify';

import row   from './row';
import table from './table';

function Row(model) {
  this.element = domify(row({
    customer: model
  }));

  bindToClickEvent(this.element, this);
}

function Table() {
  this.element = domify(table());
}

Table.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

Table.prototype.add = function(model) {
  this.element.querySelector('tbody').appendChild(new Row(model).element);

  return this;
};

export default Table;

function bindToClickEvent(element, view) {
  element.addEventListener('click', function(e) {
    page('/customers/' + element.dataset.id);
  });
}