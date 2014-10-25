var City = require('../schemas/city.js');
var Repository = require('./generalRepository.js');

function CityRepository(){
	Repository.prototype.constructor.call(this);
	this.model = City;
}

CityRepository.prototype = new Repository();

CityRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({});
	query.exec(callback);
};

module.exports = new CityRepository();