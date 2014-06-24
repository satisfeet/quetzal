var query  = require('query');
var domify = require('domify');

var template = require('./template');

function Form(model) {
  this.element = domify(template());
}

module.exports = Form;
