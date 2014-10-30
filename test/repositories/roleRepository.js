var mongoose = require('mongoose');
var roleRepository = require('../../backend/repositories/roleRepository.js');

describe('roleRepository should', function () {
	it('call method getAll and return objects', function(done){
		roleRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});
	it('call method getRoleId and do not return errors', function(done){
		roleRepository.getRoleId("1450faac96577f30235ec574" ,function(err, data){
			(err===null).should.be.true;
			done();
		});
	});
});