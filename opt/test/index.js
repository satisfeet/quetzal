var supertest = require('supertest');

var app = require('../../lib');

before(function() {
  this.server = app.listen();
  this.username = app.auth.username;
  this.password = app.auth.password;
});

describe('GET /', function() {

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/')
      .auth(this.username, this.password)
      .expect(200, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/')
      .expect(401, done);
  });

});
