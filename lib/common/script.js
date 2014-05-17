var fs       = require('fs');
var uglify   = require('uglify-js');
var jade     = require('builder-jade');
var builder  = require('component-builder');

module.exports = function(options) {

  var source, require = builder.scripts.require;

  return function* script(next) {
    if (this.path === '/javascripts/build.js') {
      if (!(this.app.env === 'production' && source)) {
        source = yield build(options.tree);

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
