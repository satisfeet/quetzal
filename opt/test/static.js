var hooks = require('./hooks');

before(hooks.setup);
before(hooks.agent);

describe('GET /stylesheets/bootstrap.css', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/stylesheets/bootstrap.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

});

describe('GET /stylesheets/bootstrap-theme.css', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/stylesheets/bootstrap-theme.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

});

describe('GET /stylesheets/build/common.css', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/stylesheets/build/common.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

});

describe('GET /stylesheets/build/customers.css', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/stylesheets/build/customers.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

});

describe('GET /javascripts/build/common.js', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/javascripts/build/common.js')
      .expect('Content-Type', /javascript/)
      .expect(200, done);
  });

});

describe('GET /javascripts/build/customers.js', function() {

  it('should respond with "OK"', function(done) {
    this.public.get('/javascripts/build/customers.js')
      .expect('Content-Type', /javascript/)
      .expect(200, done);
  });

});
