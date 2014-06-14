var path = require('path');

module.exports = function(app) {

  merge(app, require('../../etc/configuration'));

  if (app.env === 'production') {
    merge(app, require('../../etc/production'));
  }

  if (app.env === 'development') {
    merge(app, require('../../etc/development'));
  }

  if (app.env === 'test') {
    merge(app, require('../../etc/testing'));
  }

  each(app, resolve);

};

function each(object, callback) {
  Object.keys(object).forEach(function(key) {
    callback(object[key], key, object);
  });
}

function merge(source, object) {
  each(object, function(value, key) {
    if (Object(value) !== value || Array.isArray(value)) {
      source[key] = value;
    } else {
      source[key] = source[key] || {};
      merge(source[key], value);
    }
  });
}

function resolve(value, key, source) {
  if (typeof value === 'string' && value.startsWith('/')) {
    source[key] = path.join(__dirname + '/../../', value);
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      value.forEach(resolve);
    } else {
      each(value, resolve);
    }
  }
}
