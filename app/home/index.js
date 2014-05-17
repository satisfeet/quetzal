import page   from 'page';
import layout from 'layout';

import List from './list';

page('/', function() {
  layout.content.insert(List());
});