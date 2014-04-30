var os      = require('os');
var util    = require('util');
var lodash  = require('lodash');
var cluster = require('cluster');

module.exports = function(app) {

  lodash.forEach(os.cpus(), function(cpu) {
    cluser.fork();
  });

  cluser.on('fork', function(worker) {
    console.log(util.format('forked worker %d', worker.id));
  });

  closer.on('exit', function(worker) {
    console.log(util.format('exited worker %d', worker.id));
  });

};
