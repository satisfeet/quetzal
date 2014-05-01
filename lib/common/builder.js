var fs       = require('fs');
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
		.use('scripts', builder.plugins.js())
		.use('scripts', builder.plugins.json())
		.end();
}
