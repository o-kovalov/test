var mongoose = require('mongoose');
var noteRepository = require('../../backend/repositories/noteRepository.js');

describe('noteRepository should', function () {
	it('call method getAll and return objects', function(done){
		noteRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});
});