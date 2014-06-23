var hooks = require('./hooks');

before(hooks.setup);
before(hooks.agent);

describe('GET /', function() {

  it('should respond with "OK"', function(done) {
    this.private.get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  });

  it('should respond with "Not Acceptable"', function(done) {
    this.private.get('/')
      .accept('json')
      .expect('Content-Type', /json/)
      .expect(406, done);
  });

  it('should respond with "Moved Temporarily"', function(done) {
    this.public.get('/')
      .expect('Location', '/session/sign-in')
      .expect(302, done);
  });

});
