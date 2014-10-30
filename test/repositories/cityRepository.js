var mongoose = require('mongoose');
var CityRepository = require('../../backend/repositories/cityRepository.js');

describe('CityRepository should', function () {
	it('call method getAll and return objects', function(done){
		CityRepository.getAll(function(err, data){
			data.should.be.object;
			done();
		});
	});

});