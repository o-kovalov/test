var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('role routes should', function(){
	it('have get /role/id route', function(done){
		request(app)
		.get('/role/get')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /role/:id route', function(done){
		request(app)
		.delete('/role/delete')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});
});