import domify from 'domify';

import template from './row.jade';

function Row(model) {
  this.element = domify(template(model));
}

export default Row;
