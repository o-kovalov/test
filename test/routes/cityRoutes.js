var app = require('../../backend/server');
var request = require('supertest');
var codes = [200, 301, 400];

describe('city routes should', function(){
	it('have get /city/id route', function(done){
		request(app)
		.get('/city/544fcdc2b64c701026aa96e1')
		.expect(200)
		.end(function(err, res){
			done(err);
		});
	});

	it('have delete /city/:id route', function(done){
		request(app)
		.delete('/city/delete')
		.expect(400)
		.end(function(err, res){
			done(err);
		});
	});
});