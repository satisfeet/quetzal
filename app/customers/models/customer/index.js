var mpath      = require('mpath');
var emitter    = require('emitter');
var collection = require('collection');
var superagent = require('superagent');

function Customer(source) {
  this.attrs = {};
  this.attrs.image = {};
  this.attrs.address = {};

  this.set(source);
}

Customer.find = function(query, callback) {
  superagent.get('/customers').query(query).accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      var models = new collection();

      res.body.forEach(function(item) {
        models.push(new Customer(item));
      });

      callback(null, models);
    });
};

Customer.findOne = function(id, callback) {
  superagent.get('/customers/' + id).accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      callback(null, new Customer(res.body));
    });
};

emitter(Customer.prototype);

Customer.prototype.get = function(key) {
  return mpath.get(key, this.attrs);
};

Customer.prototype.set = function(key, value) {
  if (arguments.length === 1) {
    for (var name in key) {
      this.set(name, key[name]);
    }
  } else {
    mpath.set(key, value, this.attrs);

    this.emit('change', key, value);
  }

  return this;
};

Customer.prototype.contains = function(value) {
  for (var key in this.attrs) {
    var attr = this.get(key);

    if (typeof attr === 'string') {
      if (~attr.toLowerCase().indexOf(value)) {
        return true;
      }
    }
  }
};

Customer.prototype.persist = function(callback) {
  var path = this.attrs.id ? '/' + this.attrs.id : '';
  var method = this.attrs.id ? 'put' : 'post';

  var self = this;

  superagent[method]('/customers' + path)
    .send(this)
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(res.body.error);

      if (res.body) {
        self.set(res.body);
      }

      callback(null);
    });
};

Customer.prototype.remove = function(callback) {
  superagent.del('/customers/' + this.attrs.id)
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(res.body);

      callback(null);
    });

  return this;
};

Customer.prototype.toJSON = function() {
  var obj = {};

  for (var key in this.attrs) {
    var value = this.get(key);

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

module.exports = Customer;
