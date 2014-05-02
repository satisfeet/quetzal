var fs       = require('fs');
var jade     = require('builder-jade');
var module6  = require('builder-es6-module-to-cjs');
var builder  = require('component-builder');
var resolver = require('component-resolver');

module.exports = function(options) {

  var style, script = builder.scripts.require;

  return function* builder(next) {
    if (/build\.(js|css)/.test(this.url)) {
      var tree = yield resolver(process.cwd(), options);

      style = yield buildStyle(tree);
      script += yield buildScript(tree);

      fs.writeFileSync(options.output.style, style);
      fs.writeFileSync(options.output.script, script);
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
    .use('scripts', module6())
    .use('scripts', builder.plugins.js())
    .use('templates', jade())
    .use('templates', builder.plugins.string())
    .end();
}
