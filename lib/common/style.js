var fs       = require('fs');
var sqwish   = require('sqwish');
var builder  = require('component-builder');
var resolver = require('component-resolver');

module.exports = function(options) {

  var source;

  return function* builder(next) {
    if (this.path === '/stylesheets/build.css') {
      if (!(this.app.env === 'production' && !source)) {
        var tree = yield *resolver(process.cwd());

        source = yield build(tree);
        if (this.app.env === 'production') {
          source = minify(source);
        }

        yield writeFile(options.output.style, source);
      }
    }

    yield next;
  };

};

function build(nodes) {
  return new builder.styles(nodes)
    .use('styles', builder.plugins.css())
    .end();
}

function minify(source) {
  return sqwish.minify(source);
}

function writeFile(path, chunk) {
  return function(callback) {
    fs.writeFile(path, chunk, callback);
  }
}