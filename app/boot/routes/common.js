import page     from 'page';
import domify   from 'domify';
import reporter from 'reporter';

import layout from '../layout';

page('/', function(context, next) {
  reporter.resolve(function(result) {
    var template = reporter.template(result);

    layout.empty().insert(domify(template))
  });
});
