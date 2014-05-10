import agent  from 'agent';

export function resolve(callback) {
  agent.get('/').end(function(err, res) {
    if (err) throw err;

    callback(res.body);
  });
}

export var template = require('./template');
