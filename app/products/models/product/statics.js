var superagent = require('superagent');
var collection = require('collection');

exports.find = function(query, callback) {
  var self = this;

  superagent.get('/products').accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      var result = new collection();

      res.body.forEach(function(item) {
        result.push(new self(item));
      });

      callback(null, result);
    });
};

exports.findOne = function(param, callback) {
  var self = this;

  superagent.get('/products/' + param).accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      callback(null, new self(res.body));
    });
};

exports.create = function(model, callback) {
  var self = this;

  superagent.post('/products').accept('json').send(model)
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(new Error(res.body.error));

      model.set(res.body);

      callback(null);
    });
};

exports.update = function(model, callback) {
  var self = this;

  superagent.put('/products/' + model.get('id')).accept('json').send(model)
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(new Error(res.body.error));

      model.set(res.body);

      callback(null);
    });
};

exports.remove = function(model, callback) {
  var self = this;

  superagent.del('/products/' + model.get('id')).accept('json')
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(new Error(res.body.error));

      callback(null);
    });
};
