var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('user routes should', function(){
	it('have get /user/id route', function(done){
		request(app)
		.get('/user/get')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /user/:id route', function(done){
		request(app)
		.delete('/user/delete')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);
			done(err);
		});
	});
});