import domify  from 'domify';
import emitter from 'emitter';

import section from './section';

function Detail(model) {
  this.element = domify(section({
    product: model
  }));
}

export default Detail;
