var app = require('../../backend/server');
var request = require('supertest')(app);
var login = require('../login');

describe('auth_routes should', function(){

   before(function (done) {
      login.login(request, function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });

  it('have get / route', function(done){
    request
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(function(err, res){
        done(err);
      })
  });

  it('have get /login route', function(done){
    request
      .get('/login')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(function(err, res){
        done(err);
      })
  });

  it('have get /forgot route', function(done){
    request
      .get('/forgot')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(function(err, res){
        done(err);
      })
  });

  it('have get /signup route', function(done){
    request
      .get('/signup')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(function(err, res){
        done(err);
      })
  });

  it('have get /profile route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /logout route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /reset/:token route', function(done){
    request
      .get('/reset/0728149b81de412b1de6f7edb1e32ead0e0912f5')
      .expect(302)
      .end(function(err, res){
        done(err);
      })
  });

});