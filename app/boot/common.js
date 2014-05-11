import page     from 'page';
import shell    from 'shell';
import reporter from 'reporter';

page('/', function(context, next) {
  reporter.resolve(function(result) {
    var template = reporter.template(result);

    shell.layout.empty().insert(template);
  });
});
