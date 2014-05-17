var domify = require('domify');

var list = require('./list');

function List() {
  this.element = domify(list());
}

module.exports = List;