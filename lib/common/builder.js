var fs       = require('fs');
var path     = require('path');
var builder  = require('component-builder');
var resolver = require('component-resolver');

module.exports = function(options) {

	return function* builder(next) {
		if (/build\.(js|css)/.test(this.url)) {
			var tree = yield resolver(process.cwd(), options);
			
			var style = yield buildStyle(tree);
			var script = yield buildScript(tree);

			yield [
				writeFile(options.output.style, style),
				writeFile(options.output.script, script)
			]
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

function writeFile(filename, buffer) {
	return function(callback) {
		fs.writeFile(filename, buffer, callback);
	}
}
