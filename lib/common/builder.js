var fs       = require('fs');
var path     = require('path');
var util     = require('util');
var jade     = require('builder-jade');
var bundler  = require('component-bundler');
var builder  = require('component-builder');
var resolver = require('component-resolver');

var require = builder.scripts.require;

module.exports = function(app) {

  if (app.env !== 'production') {
    app.use(build);
  }

};

function* build(next) {
  if (/build\/(.*)\.(css|js)$/.test(this.path)) {
    var options = this.app.builder;

    // resolve bundle tree
    var bundles = yield resolve(options);

    // build for each component bundle
    for (var name in bundles) {
      var bundle = bundles[name];

      // build component script files
      if (path.extname(this.path) === '.js') {
        var script = yield buildScripts(bundle);

        if (!Object.keys(bundles).indexOf(name)) {
          script = require + jade.runtime + script;
        }

        yield writeFile(util.format(options.paths.scripts, name), script);
      }
      // build component style files
      if (path.extname(this.path) === '.css') {
        var style = yield buildStyles(bundle);

        yield writeFile(util.format(options.paths.styles, name), style);
      }
    }
  }

  yield next;
}

function* resolve(options) {
  var tree = yield resolver(null, options);
  var meta = {
    locals: Object.keys(tree.locals)
  };

  return bundler.pages(meta)(tree);
}

function buildScripts(nodes) {
  return new builder.scripts(nodes)
    .use('scripts', builder.plugins.js())
    .use('templates', jade({ runtime: true }))
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
