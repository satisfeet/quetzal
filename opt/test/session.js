var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);
before(hooks.agent);

describe('GET /session', function() {

  it('should respond with "No Content"', function(done) {
    this.private.get('/session')
      .accept('json')
      .expect(204, done)
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.private.get('/session')
      .expect('Location', '/')
      .expect(302, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.get('/session')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/session')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('POST /session', function() {

  it('should respond with "No Content"', function(done) {
    supertest(this.server).post('/session')
      .accept('json')
      .send({
        username: this.username,
        password: this.password
      })
      .expect(204, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    supertest(this.server).post('/session')
      .type('form')
      .send({
        username: this.username,
        password: this.password
      })
      .expect('Location', '/')
      .expect(302, done);
  });

});

xdescribe('DELETE /session', function() {

  // TODO: for some reason setting up this agent does not work
  // as the following requests do not contain any cookies
  beforeEach(function(done) {
    this.agent = supertest.agent(this.server);
    this.agent.post('/session')
      .accept('json')
      .send({
        username: this.username,
        password: this.password
      })
      .expect(204, done);
  });

  it('should respond with "No Content"', function(done) {
    this.agent.del('/session')
      .accept('json')
      .expect(204, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.agent.post('/session')
      .type('form')
      .send({
        _method: 'DELETE'
      })
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.post('/session')
      .accept('json')
      .expect(401, done)
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.post('/session')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('GET /session/sign-in', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/session/sign-in')
      .expect('Content-Type', /html/)
      .expect(200, done)
  });

  it('should respond with "Not Acceptable"', function(done) {
    this.public.get('/session/sign-in')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(406, done);
  });

});

describe('GET /session/sign-out', function() {

  it('should respond with "OK"', function(done) {
    this.private.get('/session/sign-out')
      .expect('Content-Type', /html/)
      .expect(200, done)
  });

  it('should respond with "Not Acceptable"', function(done) {
    this.private.get('/session/sign-out')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(406, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/session/sign-out')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.get('/session/sign-out')
      .accept('json')
      .expect(401, done)
  });

});
