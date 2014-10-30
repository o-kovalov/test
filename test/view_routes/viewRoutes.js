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

  it('have get /milestones route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /notes route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /projects route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /users route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

  it('have get /userstoprojects route', function(done){
      var req = request.get('/profile');
      agent.attachCookies(req);
      req.expect(200, done);
  });

});