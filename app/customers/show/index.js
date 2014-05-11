import query   from 'query';
import domify  from 'domify';
import events  from 'events';
import emitter from 'emitter';

import section from './section';

function Show(model) {
  this.element = domify(section(model));
}

export default Show;
