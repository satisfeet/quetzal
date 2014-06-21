var query  = require('query');
var domify = require('domify');

var template = require('./template.jade');

function Show(model) {
  this.element = query('#customers-show') || domify(template({
    customer: model.toJSON()
  }));
}

module.exports = Show;
