var fs       = require('fs');
var uglify   = require('uglify-js');
var jade     = require('builder-jade');
var es6mod   = require('builder-es6-module-to-cjs');
var builder  = require('component-builder');
var resolver = require('component-resolver');

module.exports = function(options) {

  var source, require = builder.scripts.require;

  return function* builder(next) {
    if (this.path === '/javascripts/build.js') {
      if (!(this.app.env === 'production' && !source)) {
        var tree = yield *resolver(process.cwd(), options);

        source = yield build(resolver.flatten(tree));

        if (this.app.env === 'production') {
          source = minify(source);
        }

        yield writeFile(options.output.script, require + source);
      }
    }

    yield next;
  };

};

function build(nodes) {
  return new builder.scripts(nodes)
    .use('scripts', es6mod())
    .use('scripts', builder.plugins.js())
    .use('templates', jade())
    .use('templates', builder.plugins.string())
    .end();
}

function minify(source) {
  return uglify.minify(source, { fromString: true }).code;
}

function writeFile(path, chunk) {
  return function(callback) {
    fs.writeFile(path, chunk, callback);
  }
}