var mongoose = require('mongoose');
var usersToProjectRepository = require('../../backend/repositories/usersToProjectRepository.js');

describe('usersToProjectRepository should', function () {
	it('call method getById and err should be null', function(done){
		usersToProjectRepository.getById("1450faac96577f30235ec574", function(err, data){
			(err===null).should.be.true;
			done();
		});
	});
	it('call method deleteByProject and err should be null', function(done){
		usersToProjectRepository.deleteByProject("1450faac96577f30235ec574",function(err, data){
			(err===null).should.be.true;
			done();
		});
	});
});