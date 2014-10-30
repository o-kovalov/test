var mongoose = require('mongoose');
var userRepository = require('../../backend/repositories/userRepository.js');

describe('userRepository should', function () {
	it('call method getAll and return objects', function(done){
		userRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});	
});