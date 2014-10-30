var mongoose = require('mongoose');
var milestoneRepository = require('../../backend/repositories/milestoneRepository.js');

describe('milestoneRepository should', function () {
	it('call method getAll and return objects', function(done){
		milestoneRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});

	it('call method getIdsByProject and return objects', function(done){
		milestoneRepository.getIdsByProject("1450faac96577f30235ec574", function(err, data){
			data.should.be.object;
			done();
		});
	});

});