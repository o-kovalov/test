var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('note routes should', function(){
	it('have get /note/id route', function(done){
		request(app)
		.get('/note/get')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /note/:id route', function(done){
		request(app)
		.delete('/note/delete')
		.end(function(err, res){
			(res.status).should.not.be.equal(200);			
			done(err);
		});
	});
});