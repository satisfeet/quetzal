var domify = require('domify');

var table = '<table></table>';

function Table() {
  this.element = domify(table);
}

Table.prototype.list = function(models) {
  models.forEach(this.add, this);

  return this;
};

Table.prototype.add = function(model) {
  this.element.appendChild(domify('<tr><td>' + model.name + '</td></tr>'));

  return this;
};

module.exports = Table;
