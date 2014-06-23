var chai      = require('chai');
var supertest = require('supertest');

var app = require('../../lib');

exports.setup = function() {
  this.server = app.listen();

  this.username = process.env.USERNAME;
  this.password = process.env.PASSWORD;
};

exports.agent = function(done) {
  this.public = supertest.agent(this.server);
  this.private = supertest.agent(this.server);

  this.private.post('/session')
    .accept('json')
    .send({
      username: this.username,
      password: this.password
    })
    .expect(204, done)
};

