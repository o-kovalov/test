var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('milestone routes should', function(){
	it('have get /milestone/id route', function(done){
		request(app)
		.get('/milestone/id')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /milestone/:id route', function(done){
		request(app)
		.delete('/milestone/delete')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);			
			done(err);
		});
	});
});