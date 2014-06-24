var fs       = require('fs');
var path     = require('path');
var util     = require('util');
var jade     = require('builder-jade');
var bundler  = require('component-bundler');
var builder  = require('component-builder');
var resolver = require('component-resolver');

var runtime = builder.scripts.require + jade.runtime;

module.exports = function(app) {

  var tree, style, script, regex = /build\/(.*)\.(css|js)$/;

  app.use(function* build(next) {
    var options = this.app.builder;

    if (regex.test(this.path)) {
      tree = yield* resolve(options.path);

      for (var name in tree) {
        bundle = tree[name];

        if (path.extname(this.path) === '.js') {
          script = yield buildScripts(bundle);

          if (!Object.keys(tree).indexOf(name)) {
            script = runtime + script;
          }

          yield writeFile(path.join(options.scripts, name + '.js'), script);

        }
        if (path.extname(this.path) === '.css') {
          style = yield buildStyles(bundle);

          yield writeFile(path.join(options.styles, name + '.css'), style);
        }
      }
    }

    yield next;
  });

};

function* resolve(path) {
  var tree = yield resolver(path, {
    install: true
  });
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
