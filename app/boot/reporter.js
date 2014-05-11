import shell    from 'shell';
import reporter from 'reporter';

export default = function(context, next) {
  reporter.resolve(function(result) {
    var template = reporter.template(result);

    shell.layout.empty().insert(template);
  });
};