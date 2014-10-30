var Role = require('../schemas/role.js');
var Repository = require('./generalRepository.js');

function RoleRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Role;
}

RoleRepository.prototype = new Repository();

RoleRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({});
	query.exec(callback);
};

RoleRepository.prototype.getRoleId = function (role, callback) {
	var model = this.model;
	var query = model.findOne({name: role});
	query.exec(callback);
};

module.exports = new RoleRepository();