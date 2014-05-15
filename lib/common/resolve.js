var resolver = require('component-resolver');

module.exports = function(options) {

  return function* resolve(next) {
    if (!/build\.(css|js)$/.test(this.path)) {
      if (!(this.app.env === 'production' && !options.tree)) {
        var tree = yield* resolver(process.cwd(), options);

        options.tree = resolver.flatten(tree);
      }
    }

    yield next;
  };

};
