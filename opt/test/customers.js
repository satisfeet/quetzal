var hooks = require('./hooks');

before(hooks.setup);
before(hooks.agent);

describe('POST /customers', function() {

  it('should respond with "Unauthorized"', function(done) {
    this.public.post('/customers')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.post('/customers')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('GET /customers', function() {

  it('should respond with "OK"', function(done) {
    this.private.get('/customers')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should respond with "OK"', function(done) {
    this.private.get('/customers')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.get('/customers')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/customers')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('GET /customers/create', function() {

  it('should respond with "OK"', function(done) {
    this.private.get('/customers/create')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond with "Not Acceptable"', function(done) {
    this.private.get('/customers/create')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(406, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.get('/customers/create')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/customers/create')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('GET /customers/:customer', function() {

  it('should respond with "Not Found"', function(done) {
    this.private.get('/customers/1234')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });

  it('should respond with "Not Found"', function(done) {
    this.private.get('/customers/1234')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with "Unauthorized"', function(done) {
    this.public.get('/customers/1234')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/customers/1234')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('PUT /customers/:customer', function() {

  it('should respond with "Unauthorized"', function(done) {
    this.public.put('/customers/1234')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Bad Request"', function(done) {
    this.private.put('/customers/1234')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should respond with "Not Found"', function(done) {
    this.private.put('/customers/1234')
      .accept('json')
      .send({
        id: '1234'
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.put('/customers/1234')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});

describe('DELETE /customers/:customer', function() {

  it('should respond with "Unauthorized"', function(done) {
    this.public.del('/customers/1234')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with "Not Acceptable"', function(done) {
    this.private.del('/customers/1234')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.del('/customers/1234')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});
