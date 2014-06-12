var fs       = require('fs');
var sqwish   = require('sqwish');
var uglify   = require('uglify-js');
var jade     = require('builder-jade');
var builder  = require('component-builder');
var resolver = require('component-resolver');

module.exports = function(options) {

  var tree, style, script, require = builder.scripts.require;

  return function* builder(next) {
    // resolve component files
    if (/build\.(css|js)$/.test(this.path)) {
      if (!(this.app.env === 'production' && tree)) {
        tree = yield* resolver(options.entry, options);
      }
    }
    // build component script files
    if (this.path === '/javascripts/build.js') {
      if (!(this.app.env === 'production' && script)) {
        script = yield buildScripts(tree);

        if (this.app.env === 'production') {
          script = uglify.minify(script, { fromString: true }).code;
        }

        yield writeFile(options.output.script, require + script);
      }
    }
    // build component style files
    if (this.path === '/stylesheets/build.css') {
      if (!(this.app.env === 'production' && style)) {
        style = yield buildStyles(tree);

        if (this.app.env === 'production') {
          style = sqwish.minify(style);
        }

        yield writeFile(options.output.style, style);
      }
    }

    yield next;
  };

};

function buildScripts(nodes) {
  return new builder.scripts(nodes)
    .use('scripts', builder.plugins.js())
    .use('templates', jade())
    .use('templates', builder.plugins.string())
    .end();
}

function buildStyles(nodes) {
  return new builder.styles(nodes)
    .use('styles', builder.plugins.css())
    .end();
}

function writeFile(path, chunk) {
  return function(callback) {
    fs.writeFile(path, chunk, callback);
  }
}
