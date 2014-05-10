import agent   from 'agent';
import emitter from 'emitter';

var manager = new emitter();

manager.find = function(callback) {
  agent.get('/customers').end(function(err, res) {
    if (err) return manager.emit('error', err);

    callback(res.body);
  });
};

export default manager;
