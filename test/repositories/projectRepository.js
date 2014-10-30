var mongoose = require('mongoose');
var projectRepository = require('../../backend/repositories/projectRepository.js');

describe('projectRepository should', function () {
	it('call method getAll and return objects', function(done){
		projectRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});

});