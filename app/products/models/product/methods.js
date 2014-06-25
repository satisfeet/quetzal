var mpath = require('mpath');

exports.get = function(key) {
  return mpath.get(key, this.attrs);
};

exports.set = function(key, value) {
  if (typeof key === 'object') {
    for (var name in key) {
      this.set(name, key[name]);
    }
  } else {
    mpath.set(key.replace('-', '.'), value, this.attrs);
  }

  return this;
};

exports.toJSON = function() {
  var obj = {};

  for (var key in this.attrs) {
    var value = this.get(key.replace('-', '.'));

    if (typeof value === 'object') {
      if (Object.keys(value).length) {
        obj[key] = value;
      }
    } else {
      obj[key] = value;
    }
  }

  return obj;
};
