var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('userstoproject routes should', function(){
	it('have get /userstoproject/id route', function(done){
		request(app)
		.get('/userstoproject/get')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /userstoproject/:id route', function(done){
		request(app)
		.delete('/userstoproject/1451eff3f2ee94b4294ac93c')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);
			done(err);
		});
	});

	it('have delete /userstoproject/:id/del route', function(done){
		request(app)
		.delete('/userstoproject/1451eff3f2ee94b4294ac93c/del')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);
			done(err);
		});
	});
});