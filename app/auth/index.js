import emitter    from 'emitter';
import superagent from 'superagent';

var auth = new emitter();

auth.authenticate = function(account) {
  superagent.post('http://engine.satisfeet.me/session')
    .send(account)
    .end(function(err, res) {
      console.log('end', err, res);
      if (err) return auth.emit('error', err);

      if (res.status === 200) {
        auth.emit('success');
      } else {
        auth.emit('failure');
      }
    });
};

module.exports = auth;
