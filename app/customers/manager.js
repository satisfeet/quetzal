import agent   from 'agent';
import emitter from 'emitter';

function Manager() {
  emitter(this);
}

Manager.prototype.find = function(callback) {
  var self = this;

  agent.get('/customers').end(function(err, res) {
    if (err) return self.emit('error', err);

    callback(res.body);
  });

  return this;
};

export default Manager;