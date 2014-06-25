var superagent = require('superagent');

exports.find = function(query, callback) {
  var self = this;

  superagent.get('/products').accept('json')
    .end(function(err, res) {
      if (err) return callback(err);

      callback(null, res.body.map(function(item) {
        return new self(item);
      }));
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

      callback(null, new self(res.body));
    });
};

exports.update = function(model, callback) {
  var self = this;

  superagent.put('/products/' + model.get('id')).accept('json').send(model)
    .end(function(err, res) {
      if (err) return callback(err);
      if (!res.ok) return callback(new Error(res.body.error));

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
