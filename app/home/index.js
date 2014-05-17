import page   from 'page';
import layout from 'layout';

import template from './template';

page('/', function() {
  layout.content.element.innerHTML = template(body);
});