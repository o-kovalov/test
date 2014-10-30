var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('project routes should', function(){
	it('have get /project/id route', function(done){
		request(app)
		.get('/project/get')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /project/:id route', function(done){
		request(app)
		.delete('/project/delete')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);
			done(err);
		});
	});
});