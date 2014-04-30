var path     = require('path');
var builder  = require('component-builder2');
var resolver = require('component-resolver');

module.exports = function(options) {

  return function* builder(next) {
    if (/build\.(js|css)/.test(this.url)) {
      var tree = yield* resolver(options.input);
      var nodes = resolver.flatten(tree);

      yield [
        createScripts(nodes).toFile(options.scripts),
        createStyles(nodes).toFile(options.styles)
      ]
    }

    yield next;
  };

};

function createScripts(nodes) {
  var build = new builder.scripts(nodes);

  build.use('scripts', builder.plugins.js());

  return build;
}

function createStyles(nodes) {
  var build = new builder.styles(nodes);

  build.use('styles', builder.plugins.css());

  return build;
}
