var os      = require('os');
var util    = require('util');
var cluster = require('cluster');

module.exports = function(app) {

  os.cpus().forEach(function(cpu) {
    cluster.fork();
  });

  cluster.on('fork', function(worker) {
    console.log(util.format('forked worker %d', worker.id));
  });

  cluster.on('exit', function(worker) {
    console.log(util.format('exited worker %d', worker.id));
  });

};
