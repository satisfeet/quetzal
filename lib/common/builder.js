var fs       = require('co-fs');
var jade     = require('builder-jade');
var estocjs  = require('builder-es6-module-to-cjs');
var builder  = require('component-builder');
var resolver = require('component-resolver');

var regex = /build\.(js|css)/;

module.exports = function(options) {

  var require = builder.scripts.require;

  return function* builder(next) {
    if (regex.test(this.path)) {
      var tree = yield *resolver(process.cwd(), options);

      if (~this.path.indexOf('.css')) {
        var style = yield buildStyle(tree);

        yield fs.writeFile(options.output.style, style);
      }
      if (~this.path.indexOf('.js')) {
        var script = yield buildScript(tree);

        yield fs.writeFile(options.output.script, require + script);
      }
    }

    yield next;
  };

};

function buildStyle(nodes) {
  return new builder.styles(nodes)
    .use('styles', builder.plugins.css())
    .end();
}

function buildScript(nodes) {
  return new builder.scripts(nodes)
    .use('scripts', estocjs())
    .use('scripts', builder.plugins.js())
    .use('templates', jade())
    .use('templates', builder.plugins.string())
    .end();
}