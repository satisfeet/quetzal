import domify  from 'domify';

import section from './section';

function Show(model) {
  this.element = domify(section(model));
}

export default Show;